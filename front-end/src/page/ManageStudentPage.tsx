import React, { ReactElement, useState, useEffect } from "react";
import { UserAPI } from "../common/service/UserAPI";

export function ManageStudentPage () : ReactElement {
    let [user, setUser] = useState<[]>([]);
    let userAPI : UserAPI = new UserAPI();
    useEffect(() => {
        userAPI.listUsers().then(
            (res) => {
                setUser(res.data);
            }
        );
      }, []);
    return (
        <div className="container">
            <h3>Students</h3>
            <div className="container">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Avatar</th>
                            <th>Status</th>
                            <th>Last login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => <tr key={index}>
                            <td>{item["userID"]}</td>
                            <td>{item["userName"]}</td>
                            <td>{item["firstName"]}</td>
                            <td>{item["lastName"]}</td>
                            <td>{item["email"]}</td>
                            <td>{item["phoneNumber"]}</td>
                            <td>{item["photoURI"]}</td>
                            <td>{item["accountStatus"]}</td>
                            <td>{item["lastLogin"]}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageStudentPage;