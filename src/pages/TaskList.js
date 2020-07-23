import React, { useState, useEffect } from 'react'
import { getTasks } from '../services/TaskService'
import moment from 'moment'

export default function TaskList() {
    
    const [tasks, setTasks] = useState([])
    const [taskError, setTaskError] = useState('')

    useEffect(() => {
        reloadTasks()
    }, [])

    const reloadTasks = () => {
        getTasks()
            .then(res => setTasks(res))
            .catch(err => setTaskError(err))
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    {
                        taskError
                        ? (
                            <div><h2>Something is wrong!!!</h2></div>
                        )
                        : tasks.map
                        (
                            t => (
                                <div className="col-md-3 p-2" key={t.id}>
                                    <div className="card">
                                        <div className="card-header text-white text-weight-bold text-uppercase">
                                            <h4 className="card-text text-center">{t.title}</h4>
                                        </div>
                                        <div className="card-body">
                                            <p>{t.description}</p>
                                            <p>{
                                                t.status === 1 ? 'To do'
                                                : t.status === 2 ? 'Doing'
                                                : t.status === 3 ? 'Done'
                                                : ''   
                                            }</p>
                                        </div>
                                        <div className="card-body">
                                            <p>Created At: {moment(t.created_at).fromNow()}</p>
                                            <p>Updated At: {moment(t.updated_at).fromNow()}</p>
                                        </div>
                                        <div className="card-footer">

                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}