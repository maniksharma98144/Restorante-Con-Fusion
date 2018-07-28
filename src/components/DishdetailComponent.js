import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';


   function RenderDish({dish}) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    function RenderComments({cmntsArray}) {
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
        if (cmntsArray.length === 0) {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div>
                    <h4>Comments</h4>
                    <div className="list-unstyled">
                        {cmntsArray.map((data) => {
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

    const DishDetail=(props)=>{
        if (props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments cmntsArray={props.dish.comments}/>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div></div>
            );
    }
export default DishDetail;