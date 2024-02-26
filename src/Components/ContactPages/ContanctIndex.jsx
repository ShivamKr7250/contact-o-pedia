import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContact from "./FavoriteContacts";
import GenralContact from "./GeneralContacts";

class ContactIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contactList: [
                {
                    id: 1,
                    name: "Shivam Kumar",
                    phone: "+91-9304961453",
                    email: "supshiv7250@gmail.com",
                    isFavorite: false,
                },
                {
                    id: 2,
                    name: "Ram Kumar",
                    phone: "+91-9988776655",
                    email: "ram9988@gmail.com",
                    isFavorite: true,
                },
                {
                    id: 3,
                    name: "Shyam Kumar",
                    phone: "+91-2233445566",
                    email: "shyam2233@gmail.com",
                    isFavorite: true,
                },
            ],
            selectedContact: undefined,
            isUpdating: false,
        };
    }

    handleAddContact = (newContact) => {
        if (newContact.name == "") {
            return { status: "failure", msg: "Please Enter a valid Name" };
        }
        else if (newContact.phone == "") {
            return { status: "failure", msg: "Please Enter a Valid Phone Number" };
        }

        const duplicateRecord = this.state.contactList.filter((x) => {
            if (x.name == newContact.name && x.phone == newContact.phone) {
                return true;
            }
        })
        if (duplicateRecord.length > 0) {
            return { status: "failure", msg: "Duplicate Record" };
        }
        else {
            const newFinalContact = { ...newContact, id: this.state.contactList[this.state.contactList.length - 1].id + 1, isFavorite: false, };
            this.setState((prevState) => {
                return {
                    contactList: prevState.contactList.concat([newFinalContact]),
                };
            });
            return { staus: "success", msg: "Contact was added Succcessfully" };
        }
    };


    handleToggleFavorites = (contact) => {
        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.map((obj) => {
                    if (obj.id == contact.id) {
                        return { ...obj, isFavorite: !obj.isFavorite };
                    }
                    return obj;
                }),
            };
        });
    };

    handleDeleteContact = (contactId) => {
        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.filter((obj) => {
                    return obj.id !== contactId;
                }),
            };
        });
    };

    hangleAddRandomContact = (newContact) => {
        const newFinalContact = { ...newContact, id: this.state.contactList[this.state.contactList.length - 1].id + 1, isFavorite: false, };

        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.concat([newFinalContact]),
            };
        });
    };

    handleRemoveAllContact = () => {
        this.setState((prevState) => {
            return {
                contactList: []
            };
        });
    };

    handleUpdateClick = (contact) => {
        console.log(contact);
        this.setState((prevState) => {
            return {
                selectedContact: contact,
                isUpdating: true,
            };
        });
    };

    handleCancelUpdateClick = (contact) => {
        console.log(contact);
        this.setState((prevState) => {
            return {
                selectedContact: undefined,
                isUpdating: false,
            };
        });
    };

    handleUpdateContact = (updatedcontact) => {
        console.log(updatedcontact);
        if (updatedcontact.name == "") {
            return { status: "failure", msg: "Please Enter a valid Name" };
        }
        else if (updatedcontact.phone == "") {
            return { status: "failure", msg: "Please Enter a Valid Phone Number" };
        }

        this.setState((prevState) => {
            return {
                contactList: prevState.contactList.map((obj) => {
                    if (obj.id == updatedcontact.id) {
                        return {
                            ...obj,
                            name: updatedcontact.name,
                            email: updatedcontact.email,
                            phone: updatedcontact.phone,
                        };
                    }
                    return obj;
                }),
                isUpdating: false,
                selectedContact: undefined,
            };
        });
        return { staus: "success", msg: "Contact was updated Succcessfully" };
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container" style={{ minHeigh: "85vh" }}>
                    <div className="row py-3">
                        <div className="col-4 offset-2 row">
                            <AddRandomContact
                                hangleAddRandomContact={this.hangleAddRandomContact} />
                        </div>
                        <div className="col-4 row ">
                            <RemoveAllContact handleRemoveAllContact={this.handleRemoveAllContact} />
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <AddContact
                                    isUpdating={this.state.isUpdating}
                                    selectedContact={this.state.selectedContact}
                                    handleAddContact={this.handleAddContact}
                                    cancelUpdateContact={this.handleCancelUpdateClick} 
                                    handleUpdateContact={this.handleUpdateContact}/>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <FavoriteContact contacts={this.state.contactList.filter((u) => u.isFavorite == true)}
                                    favoriteClick={this.handleToggleFavorites}
                                    deleteContact={this.handleDeleteContact}
                                    updateClick={this.handleUpdateClick} />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <GenralContact contacts={this.state.contactList.filter((u) => u.isFavorite == false)}
                                    favoriteClick={this.handleToggleFavorites}
                                    deleteContact={this.handleDeleteContact}
                                    updateClick={this.handleUpdateClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ContactIndex;