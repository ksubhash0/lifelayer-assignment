import { useState, useEffect } from "react";
import { getCandidateById } from "../http";
import { useParams } from "react-router-dom";

export default function View () {

    const [candidate, setCandidate] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams()

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const {data} = await getCandidateById(id);
                setCandidate(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCandidate()
    }, [id])
    return (
        <div>
            <section id="home">
                <div className="my-container">
                    {candidate._id ? (<div className="card list-card">
                        <h1 className="heading-primary">View Candidate</h1>
                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Candidate Details</h2>
                            <div className="">
                               <table cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Mobile</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><p className="text">{candidate.name}</p></td>
                                        <td><p className="text">{candidate.email}</p></td>
                                        <td><p className="text">{candidate.mobile}</p></td>
                                    </tr>
                                </tbody>
                               </table>
                            </div>
                        </div>

                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Education</h2>
                             
                              <table cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <td>Degree Name</td>
                                        <td>University</td>
                                        <td>From</td>
                                        <td>To</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        candidate.educations.map((edu) => (
                                            <tr key={edu._id}>
                                        <td><p className="text">{edu.degree}</p></td>
                                        <td><p className="text">{edu.university}</p></td>
                                        <td><p className="text">{edu.from.split('T')[0]}</p></td>
                                        <td><p className="text">{edu.to.split('T')[0]}</p></td>
                                    </tr>
                                        ))
                                    }
                                </tbody>
                              </table>
                        </div>

                        <div className="candate-detail form-section">
                            <h2 className="sub-heading">Experiences</h2>
                            <table cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <td>Company</td>
                                        <td>Role</td>
                                        <td>From</td>
                                        <td>To</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        candidate.experiences.map((ex) => (
                                            <tr key={ex._id}>
                                        <td><p className="text">{ex.company}</p></td>
                                        <td><p className="text">{ex.role}</p></td>
                                        <td><p className="text">{ex.from.split('T')[0]}</p></td>
                                        <td><p className="text">{ex.to.split('T')[0]}</p></td>
                                    </tr>
                                        ))
                                    }
                                </tbody>
                              </table>
                        </div>

                        <div className="candate-detail form-section">
                           <h2 className="sub-heading">Portfolio</h2>
                           <div className="portfoio-preview">
                            <label htmlFor="port">
                            <img style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px'}} src={candidate.portfolio || '/img/placeholder.jpg'} alt="preview" />
                            </label>
                
                           </div>
                        </div>

                        
                        
                    </div>) :null}

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
