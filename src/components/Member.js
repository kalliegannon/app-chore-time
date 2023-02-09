import './Member.css'
import PropTypes from 'prop-types';

const Member = (props) => {

    return (
        <div className='member'>
            <p>{props.message}</p>
            <div className='member-buttons'>
                <button onClick={() => props.updateMember(props.member_id)}>{props.member_name} Update</button>
                <button onClick={() => props.createMember(props.member_id)}>{props.member_name} Create</button>
                <button onClick={() => props.deleteMember(props.member_id)}>delete</button>
            </div>
        </div>
    )
}

Member.propTypes = {
    member_id: PropTypes.number,
    member_name: PropTypes.string,
    household_id: PropTypes.number,
    onUpdate: PropTypes.func
};

export default Member 

//     member_name = db.Column(db.String)
// member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
// household_id = db.Column(db.Integer, db.ForeignKey("household.household_id"))
// chores = db.relationship("Chore", back_populates="member")
// household = db.relationship("Household", back_populates="members")