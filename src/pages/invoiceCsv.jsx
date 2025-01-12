import  { useEffect, useState } from 'react';
import { CSVDownload, CSVLink } from 'react-csv';
const InvoiceCsv = () => {

    const [users, setUsers] = useState()
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        let data = []
        json.forEach(user => {
            let object = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            }
            data.push(object)
        });
        setUsers(data)
      })
    }, []);
    console.log(users)
  return (
    <>
        <div className="text-white">
            <table>
                <thead>
                    <tr>
                        <th>ID:</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user)=> (
                        <tr key={user.id}>
                            <td>{user.id} </td>
                            <td>{user.name} </td>
                            <td>{user.username} </td>
                            <td>{user.email} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        <CSVLink></CSVLink>
    </>
  )
}

export default InvoiceCsv;