import React, { useState } from 'react'
import { postTask } from '../services/TaskService'

export default function TaskForm({history}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const toSave = (event) => {
        event.preventDefault()

        postTask({title, description})
            .then(res => {
                if (res.title) {
                    setTitle('')
                    setDescription('')
                    history.push('/task-list')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="row p-2">
            <div className="col-md-4 p2"></div>
            <div className="col-md-4 p2">
                <div className="card bg-primary text-white">
                    <div className="card-header text-center">
                        <h4 className="card-text">Add Task</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title" className="form-control-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    value={title}
                                    onChange={onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="form-control-label">
                                    Description
                                </label>
                                <textarea 
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="5"
                                    className="form-control"
                                    value={description}
                                    onChange={onChangeDescription}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-outline-light rounded-circle btn-lg" onClick={toSave}>Save</button>
                    </div>
                </div>
            </div>
            <div className="col-md-4 p2"></div>
        </div>
    )
}