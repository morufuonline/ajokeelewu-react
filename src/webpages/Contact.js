import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import { FaMapMarkerAlt, FaRegEnvelope, FaPhone, FaUser, FaFileAlt, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { AppEmail, AppPhone } from '../components/General';
import axios from '../api/axios';
import DataContext from '../context/DataContext';

const Contact = () => {

    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [contactRotate, setContactRotate] = useState(false);
    const [contactMsg, setContactMsg] = useState("");
    const {SuccessMsg, ErrMsg} = useContext(DataContext);

    const handleSubmitContact = (e) => {
        e.preventDefault();
        setContactRotate(true);
        setContactMsg("");
    
        axios({
            method: 'post',
            url: "/contact",
            data: {name:contactName, email:contactEmail, phone, subject, message}
        })
        .then(res => {
            setContactRotate(false); 
            setContactName("");
            setContactEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
            setContactMsg(<SuccessMsg res={res} />);
        })
        .catch(err => {
            setContactRotate(false);
            setContactMsg(<ErrMsg err={err} />);
        })
    
        };

    return (
        <div className="home-body-wrapper"> 
        <div className="container"> 

        <div className="col-md-5 content-body">

        <div className="body-header"><FaMapMarkerAlt /> Address</div>
        <p className="align-center">23, Unity Cresent Ajasa Command, Alimosho LGA, Lagos Nigeria. </p>

        <div className="body-header"><FaRegEnvelope /> Email</div>
        <p className="align-center"><Link to={`mailto:${AppEmail}`}>{AppEmail}</Link></p>

        <div className="body-header"><FaPhone /> Phone</div>
        <p className="align-center">{AppPhone}</p>

        </div>
        <div className="col-md-7 content-vission">

        {contactMsg?contactMsg:""}

        <form method="post" className="special-form" id="contact-result" onSubmit={handleSubmitContact}>  

        <div className="special-title border-radius"><FaRegEnvelope style={{fontSize:"25px"}} /> Send us a mail</div>
        <fieldset className="border-radius">

        <div className="form-group input-group">
        <span className="input-group-addon"><FaUser /></span>
        <input type="text" name="name" id="name" className="form-control" placeholder="Your Full Name *" required value={contactName} onChange={(e) => setContactName(e.target.value)} />
        </div>

        <div className="form-group input-group">
        <span className="input-group-addon"><FaRegEnvelope /></span>
        <input type="email" name="email" id="email" className="form-control" placeholder="Your E-mail Address *" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </div>

        <div className="form-group input-group">
        <span className="input-group-addon"><FaPhone /></span>
        <input type="text" name="phone" id="phone" className="form-control only-no" placeholder="Your Phone Number *" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9.+]/gi, ""))} />
        </div>

        <div className="form-group input-group">
        <span className="input-group-addon"><FaFileAlt /></span>
        <input type="text" name="subject" id="subject" className="form-control" placeholder="Subject (Make it short) *" required value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div className="form-group input-group">
        <span className="input-group-addon"><FaRegEnvelope /></span>
        <textarea type="text" name="message" id="message" className="form-control" placeholder="Details *" required defaultValue={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>

        <div>
        <button type="submit" className="btn gen-btn float-right" disabled = {contactRotate}>{contactRotate?<FaSpinner className="fa-spin" />:<FaPaperPlane />} Send</button>
        </div>

        </fieldset>
        </form>

        </div>

        </div>
        </div>
    );
};
export default Contact;
