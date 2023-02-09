import axios from 'axios';
import React, { useEffect, useState } from "react";

const Household = () => {
    const [householdData, setHouseholdData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [selectedHousehold, setSelectedHousehold] = useState(0);
    const [selectedHouseholdName, setSelectHouseholdName] = useState('');

    const onHouseholdSubmit = (newHouseholdData) => {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/households`, newBoardData)
        .then(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/households`).then((response) => {
            setHouseholdData(response.data);
        }, []);
        })
        .catch((error) => {
        console.log(error);
    });
    };

    const getHouseholdId = (id) => {
        setSelectedHousehold(id);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/households/${id}/members`).then((response) => {
            setMemberData(response.data)
        })
    }
        const getHouseholdName = (name) => {
            setSelectedHouseholdName(name);
        }
    
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/households`).then((response) => {
                setHouseholdData(response.data);
            });
        }, []);
        
        
        const addMemberCallback = (newMemberData) => {
            let member_id = selectedHousehold;
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/households/${household_id}/members`, newMemberData)
            .then(() => {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/households/${household_id}/members`).then((response)=> {
                setMemberData(response.data)
                });
            }) 
            .catch(error => {
                console.log(error)
            });
        };
    
        const updateMember = (id) => {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/members/${id}`)
            .then(() => {
                // console.log(response)
                const newMembers = memberData.map((member) => {
                    if (member.member_id === id) {
                        return {...member, member.member_name}
                    } else {
                        return member;
                    }
            })
            setMemberData(newMembers)
            });
        };
    
        const deleteMember = (id) => {
            for (let member of memberData) {
                if (member.member_id === id) {
                    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/members/${id}`)
                    .then(() => {
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/households/${selectedHousehold}/members`).then((response) => {
                        setMemberData(response.data)
                    });
                    })
                }
            };
        };

        return (
            <section className='app'>
                <section className="household-container">
                    <section className="input-section">
                        <div className='user-choice'>
                            <label className='label-name'>Choose Board to Display</label>
                            <Dropdown className='dropdown' boardData={boardData} getBoardId={getBoardId} getBoardTitle={getBoardTitle}></Dropdown>
                            <label className='label-name'>Create a Board</label>
                            <NewBoardForm onBoardSubmit={onBoardSubmit}></NewBoardForm>
                            <label className='label-name'>Create a Card</label>
                            <NewCardForm addCardCallback={addCardCallback}></NewCardForm>
                        </div>
                        <div className='board-title'>
                            <h2 className='board-title'>{selectedBoardTitle}</h2>
                        </div>
                    </section>
                </section>
                <CardList 
                cardData={cardData} 
                updateCard={updateCard}
                deleteCard={deleteCard}
                ></CardList>
            </section>
        );
        };
        
        export default Board;