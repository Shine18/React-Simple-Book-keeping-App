import React, { useState, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";

export default function Records() {
    const [reRender, setReRender] = useState(false)
    const [isEditing, setEditing] = useState(false)
    const [editingRecord, setEditingRecord] = useState({})
    const [editIndex, setEditIndex] = useState()

    const [records, setRecords] = useState([])
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState("")
    const [eDate, seteDate] = useState(new Date())


    const addRecord = useCallback(() => {
        console.log("adding callback")
        console.log("Amount", amount)
        console.log("description", description)

        if (amount == "" || description == "") {

            toast.error('Please add amount/description')
            return
            // dont add the record 
        }

        const newRecord = {
            date: eDate,
            description,
            amount
        }

        const prevRecords = records.splice(0)
        prevRecords.push(newRecord)
        setRecords(prevRecords)

        toast('Boom! Record Added 😎')

        setAmount("")
        setDescription('')
        seteDate(new Date())
    })


    const editRecord = useCallback( (index) => {
        setEditing(true)
        const record = records[index]
        setEditingRecord(record)
        setEditIndex(index)

        setAmount(record.amount)
        seteDate(record.date)
        setDescription(record.description)
    })

    const updateRecord = useCallback( () => {
        let prevRecords = records
        prevRecords[editIndex] = {
            amount,
            description,
            date: eDate
        }
        console.log(prevRecords)
        setRecords(prevRecords)
        cancelEditing()


        toast('Boom! Record Updated 😎')
    })

    const cancelEditing = useCallback(() => {
        setEditing(false)
        setEditingRecord({})
        setAmount("")
        setDescription("")
        seteDate(new Date())
    })

    const deleteRecord = useCallback( (index) => {
        let prevRecords = records
        prevRecords.splice(index, 1)
        console.log(prevRecords)
        setRecords(prevRecords)
        setEditing(false)
        toast("Record Deleted")
        setReRender(!reRender)
        
    }, [ records])

    return (
        <div className="container py-4 mx-auto">
            <div className="border border-slate-400 rounded shadow-md px-5 py-8 mb-5">
                <h2 className="uppercase font-mono text-xl">
                    {
                        isEditing 
                        ? "Edit Record"
                        : "Add new Record"
                    }
                </h2>
                <label className="mt-5 w-full block text-xs uppercase font-bold" for="amount">Amount</label>
                <input
                    type="number"
                    value={amount}
                    id="amount"
                    onChange={e => { setAmount(e.target.value) }}
                    className="p-4 py-2 text-xs border-slate-400 border w-full mt-3"
                    placeholder="Amount?"
                />
                <label className="mt-5 w-full block text-xs uppercase font-bold" for="date">Date</label>
                <ReactDatePicker
                    selected={eDate}
                    id="date"
                    className="p-4 py-2 text-xs border-slate-400 border w-full mt-3"
                    onChange={(date) => { seteDate(date) }}
                />
                <label className="mt-5 w-full block text-xs uppercase font-bold" for="description">Description</label>
                <textarea
                    id="description"
                    className="p-4 py-2 text-xs border-slate-400 border w-full mt-3"
                    placeholder="Description of the expense"
                    onChange={e => { setDescription(e.target.value) }} value={description}>
                </textarea>
                {
                    isEditing 
                    ? <button onClick={updateRecord} className="bg-teal-500 p-7  mt-3 uppercase text-white py-2 text-center text-xs shadow-lg">Update</button>
                    : <button onClick={addRecord} className="bg-teal-500 p-7  mt-3 uppercase text-white py-2 text-center text-xs shadow-lg">Add</button>
                }

                { 
                    isEditing ?
                    <button 
                        className="p-7 mt-3 uppercase py-2 text-center text-xs "
                        onClick={ cancelEditing}
                    >Cancel</button>
                    : ""
                }
            </div>


            <h2 className="uppercase font-mono text-2xl">Records</h2>
            <table className="table w-full">
                <thead className="table-header-group bg-slate-200">
                    <tr className="table-row">
                        <th className="table-cell py-2 px-3">#</th>
                        <th className="table-cell py-2 px-3">Date</th>
                        <th className="table-cell py-2 px-3">Amount</th>
                        <th className="table-cell py-2 px-3">Description</th>
                        <th className="table-cell py-2 px-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-row-group">
                    {
                        records.map((record, index) => {
                            const formattedDate = `${record.date.getDate()}-${record.date.getMonth() + 1}-${record.date.getFullYear()}`
                            return (
                                <tr key={index} className="table-row">
                                    <td className="table-cell py-2 px-3">{index + 1}</td>
                                    <td className="table-cell py-2 px-3">
                                        {formattedDate}
                                    </td>
                                    <td className="table-cell py-2 px-3">${record.amount}</td>
                                    <td className="table-cell py-2 px-3">{record.description}</td>
                                    <td className="table-cell py-2 px-3">
                                        <button
                                            className="p-3 text-xs py-1 bg-blue-500 text-white uppercase shadow-md hover:bg-blue-600"
                                            onClick={() => { editRecord(index)}}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="p-3 text-xs py-1 ml-1 bg-red-500 text-white uppercase shadow-md hover:bg-red-600"
                                            onClick={() => { deleteRecord(index)}}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}