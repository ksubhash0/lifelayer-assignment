import { useState , useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import { validateEmail, validateMobileNumber } from "../utils/validator";
import { createCandidate, getCandidateById, updateCandidate } from "../http";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useEditImage from '../hooks/useEditImage'

export default function Edit () {

    const [candidate, setCandidate] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    
    const {image, handleFile, editImage} = useEditImage()

    const [educations, setEducation] = useState([{
        degree: '',
        university: '',
        from: '',
        to: ''
    }]);

    const navigate = useNavigate()

    const [expriences, setExpriences] = useState([
        {
            company: '',
            role: '',
            from: '',
            to: ''
        }
    ])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const {data} = await getCandidateById(id);
                setCandidate(data)
                setName(data.name);
                setEmail(data.email);
                setMobile(data.mobile);
                setEducation(data.educations);
                setExpriences(data.experiences)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCandidate()
    }, [id])

    const removeEducation = (index) => {
        const deleted = [...educations];
        deleted.splice(index, 1);
        setEducation(deleted)
    }

    const handleChangeEdu = (e, index) => {
        const updatedOpt = [...educations];
        updatedOpt[index][e.target.name] = e.target.value;
        setEducation(updatedOpt)
        console.log(educations)
       
    }

    const removeExprience = (index) => {
        const deleted = [...expriences];
        deleted.splice(index, 1);
        setExpriences(deleted)
    }

    const handleChangeExp = (e, index) => {
        const updatedOpt = [...expriences];
        updatedOpt[index][e.target.name] = e.target.value;
        setExpriences(updatedOpt)
        console.log(expriences)
       
    }

    const handleAdd = async () => {
        console.log({name, email, mobile})
        if(!name){
            toast.error('Name is required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        if(!validateEmail(email)){
            toast.error('Invalid Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        if(!validateMobileNumber(+mobile)){
            toast.error('Mobile must be 10 digit number', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        educations.forEach((edu) => {
            if(!edu.degree || !edu.university || !edu.from || !edu.to){
                toast.error('Every Field in education is required', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                return;
            }
        })

        expriences.forEach((exp) => {
            if(!exp.company || !exp.role || !exp.from || !exp.to){
                toast.error('Every Field in exprience is required', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                return;
            }
        })

        try {

            const {data} = await toast.promise(
            updateCandidate(id, {
               name,
               email,
               mobile,
               experiences: expriences, 
               educations,
               editImage: image
            }),
            {
                pending: 'Updating Candidate',
                success: 'Candidate Updated'
            }
        )
       
        navigate('/')
            
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        

    }
    return (
        <div>
            <section id="home">
                <div className="my-container">
                    {candidate._id ? (<div className="card list-card">
                        <h1 className="heading-primary">Add A Candidate</h1>
                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Candidate Details</h2>
                            <div className="form-row-3">
                                <div className="input-group">
                                    <label htmlFor="name">Full Name</label><br />
                                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="mobile">Mobile</label><br />
                                    <input className="input" value={mobile} onChange={(e) => setMobile(e.target.value)} type="number" id="mobile" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label><br />
                                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
                                </div>
                            </div>
                        </div>

                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Education</h2>
                            
                            {
                                educations.map((edu, i) => (
                                    <div className="d-row" style={{display: 'flex', alignItems: 'end'}}>
                                        <div className="form-row-4">
                                <div className="input-group">
                                    <label htmlFor={`${edu.degree}i`}>Degree Name</label><br />
                                    <input className="input" name="degree" onChange={(e) => handleChangeEdu(e, i)} value={edu.degree} type="text" id={`${edu.degree}i`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`university${i}`}>University</label><br />
                                    <input className="input" name="university" onChange={(e) => handleChangeEdu(e, i)} value={edu.university} type="email" id={`university${i}`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`from${i}`}>from</label><br />
                                    <input className="input"  name="from" value={edu.from.split('T')[0]} onChange={(e) => handleChangeEdu(e, i)} type="date" id={`from${i}`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`to${i}`}>To</label><br />
                                    <input className="input" name="to" value={edu.to.split('T')[0]} onChange={(e) => handleChangeEdu(e, i)} type="date" id={`to${i}`} />
                                </div>
                            </div>
                            <div className="remove-field">
                                <button className="btn-primary" onClick={() => removeEducation(i)}>x</button>
                            </div>
                                    </div>
                                ))
                            }
                           
                            <div className="add-field">
                                <button onClick={() => setEducation([...educations, {degree: '', university: '', from: '', to: ''}])} className="btn-primary">Add Education</button>
                            </div>
                        </div>

                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Experiences</h2>
                            {
                                expriences.map((exp, i) => (
                                    <div className="d-row" style={{display: 'flex', alignItems: 'end'}}>
                            <div className="form-row-4">
                                <div className="input-group">
                                    <label htmlFor={`comp${i}`}>Company</label><br />
                                    <input className="input" value={exp.company} name="company" onChange={(e) => handleChangeExp(e, i)}  type="text" id={`comp${i}`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`role${i}`}>Role</label><br />
                                    <input className="input" value={exp.role} name="role" onChange={(e) => handleChangeExp(e, i)} type="email" id={`role${i}`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`efrom${i}`}>from</label><br />
                                    <input className="input" name="from" value={exp.from.split('T')[0]} onChange={(e) => handleChangeExp(e, i)} type="date" id={`efrom${i}`} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`eto${i}`}>To</label><br />
                                    <input className="input" name="to" value={exp.to.split('T')[0]} onChange={(e) => handleChangeExp(e, i)} type="date" id={`eto${i}`} />
                                </div>
                            </div>
                            <div className="remove-field">
                                <button onClick={() => removeExprience(i)} className="btn-primary">x</button>
                            </div>
                            </div>
                                ))
                            }
                            <div className="add-field">
                                <button onClick={() => setExpriences([...expriences, {company: '', role: '', from: '', to: ''}])} className="btn-primary">Add Education</button>
                            </div>
                        </div>

                        <div className="candate-detail form-section">
                           <h2 className="sub-heading">Portfolio</h2>
                           <div className="portfoio-preview">
                            <label htmlFor="port">
                            <img style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px'}} src={image || candidate.portfolio} alt="preview" />
                            </label>
                            <input type="file" onChange={(e) => handleFile(e)} id="port" style={{opacity: '0', position: 'absolute'}} />
                           </div>
                        </div>

                        <div className="add-field">
                                <button onClick={handleAdd} className="btn-primary">Update</button>
                        </div>

                        
                    </div>) : null}

                    {
                            !candidate._id ? (
                                <div style={{width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <p className="text">{loading ? 'Getting candidate data...' : 'Candidate not found'}</p>
                                </div>
                            ) : null
                        }
                </div>
            </section>
        </div>
    )
}