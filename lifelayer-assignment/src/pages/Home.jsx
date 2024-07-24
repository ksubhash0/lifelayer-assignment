import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getCandidate, deleteCandidate } from "../http";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function Home () {

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [candidates, setCandidates] = useState([]);

    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(true);

    const handleDelete = async (id) => {
        try {
            const {data} = await toast.promise(
                deleteCandidate(id),
                {
                  pending: 'Deleting candidate',
                  success:'Candidate deleted',
                }
            )
           setReload(!reload)
           
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

    useEffect(() => {
        const fetchCandidate = async () => {
            setLoading(true)
            try {
                const {data} = await getCandidate(page)
                setCandidates(data.candidates)
                setTotal(data.total)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchCandidate();
    }, [page, reload])

    return (
        <div className="home-page">
            <section id="home">
               <div className="my-container">
               <div className="card list-card">
                    <div className="list-header">
                        <h1 className="heading-primary">All Candidate</h1>
                        <div style={{width: '130px'}}>
                            <NavLink to='/add-candidate'><button className="btn-primary">Add Candidate</button></NavLink>
                        </div>
                    </div>
                    <div className="list-body">
                        {candidates.length > 0 ? (<table cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Mobile</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                candidates.map((candidate) => (
                                    <tr>
                                    <td><p className="text">{candidate.name}</p></td>
                                    <td><p className="text">{candidate.email}</p></td>
                                    <td><p className="text">{candidate.mobile}</p></td>
                                    <td>
                                        <div className="table-action">
                                            <NavLink to={`/view-candidate/${candidate._id}`}><button className="link">View</button></NavLink>
                                            <NavLink to={`/edit-candidate/${candidate._id}`}><button className="link">Edit</button></NavLink>
                                            <button onClick={() => handleDelete(candidate._id)} className="link">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                              
                                ))
                               }
                            </tbody>
                        </table>) : null}

                        {
                            candidates.length == 0 ? (
                                <div style={{width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <p className="text">{loading ? 'Getting candidate data...' : 'No Candidate found'}</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="list-footer">
                      {total > 5 ? <Pagination count={Math.ceil(total / 5)} page={page} onChange={(e, v) => setPage(v)} variant="outlined" color="secondary" /> : null}
                    </div>
                </div>
               </div>
            </section>
        </div>
    )
}