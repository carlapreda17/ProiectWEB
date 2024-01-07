import {useNavigate} from "react-router-dom";

function Materie(props) {
    const {materie: {an, id_facultate, id_materie, nume, poza}} = props;

    const navigate=useNavigate();

    const handleMaterieClick = () => {
        navigate(`/materie/${id_materie}`);
    };

    return (
        <div onClick={handleMaterieClick} id={'materie-anchor'} className={'w-[30%] cursor-pointer p-4 bg-baby-pink rounded-md m-tablet:w-[45%]'}>
            <div className={'relative h-0 pb-[60%]'}>
                <img src={`${poza}`} alt={'Photo of materie'} className={'absolute top-0 left-0 object-cover h-full w-full rounded-md'}/>
            </div>
            <div className={'mt-3'}>
                <span className={'block text-lg text-dark-purple'}>{nume}</span>
            </div>
        </div>
    )
}

export default Materie;