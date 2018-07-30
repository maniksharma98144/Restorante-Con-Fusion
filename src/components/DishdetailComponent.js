import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';


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

function RenderComments(props) {
    console.log(props)
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
    if (props.comments.length === 0) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div>
                <h4>Comments</h4>
                <div className="list-unstyled">
                    {props.comments.map((data) => {
                        return (
                            <div key={data.id}>
                                <li>{data.comment}</li>
                                <br />
                                <li>-- {data.author}, {obj[data.date.substr(5, 2)]} {data.date.substr(8, 2)}, {data.date.substr(0, 4)}</li>
                                <br />
                            </div>
                        )
                    })}
                </div>
            </div>
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
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}
export default DishDetail;