import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Row,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish(props) {
    return (
        <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({ comments, addComment, dishId }) {
    var obj = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    };
    if (comments.length === 0) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div className="col-12 col-md-10 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((data) => {
                        return (
                            <div key={data.id}>
                                <li>{data.comment}</li>
                                <p>-- {data.author}, {obj[data.date.substr(5, 2)]} {data.date.substr(8, 2)}, {data.date.substr(0, 4)}</p>
                            </div>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.ratings, values.name, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <label htmlFor="ratings">Ratings</label>
                                    <Control.select model=".ratings" defaultValue="1" className="form-control" id="ratings" name="ratings">
                                        <option value="-1" disabled>-1</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: "Must be Greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} />
                                </Row>
                                <Row className="form-group">
                                    <label htmlFor="comment">Comment</label>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        </div>
    );
}
export default DishDetail;