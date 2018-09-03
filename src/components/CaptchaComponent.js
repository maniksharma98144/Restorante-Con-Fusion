import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google'
class Captcha extends Component {
    constructor(props) {
        super(props);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }
    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
    }
    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }
    verifyCallback(recaptchaToken) {
        console.log(recaptchaToken, "<= your recaptcha token")
    }
    render() {
        return (
            <React.Fragment>
                <ReCaptcha
                    ref={(el) => { this.captchaDemo = el; }}
                    size="normal"
                    data-theme="dark"
                    render="explicit"
                    sitekey="Your Key"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                />
            </React.Fragment>
        );
    };
};
export default Captcha;
