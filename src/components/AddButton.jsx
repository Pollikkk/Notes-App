import './AddButton.css'

function AddButton({onClick}) {

    return (
        <>
            <button className='addButton' onClick={onClick}> + </button>
        </>
    )
}

export default AddButton