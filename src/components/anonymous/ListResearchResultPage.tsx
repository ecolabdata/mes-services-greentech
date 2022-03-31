import DropDown from '../dsfrComponents/DropDown';
import Pagination from '../dsfrComponents/Pagination';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers/root.reducer';
import { userActions } from '../../_actions/user.actions';
import { CardType } from '../../model/CardType';
import { useParams } from 'react-router-dom';
import { AnyCard, getSearch } from '../../api/Api';
import ToggleButton from '../customComponents/ToggleButton';

interface ListResearchResultProps {
    cardType: CardType
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({ cardType }) => {

    const dispatch = useDispatch();
    const { searchId } = useParams();
    if (!searchId) throw new Error("searchId param is mandatory")
    const initialSearch = getSearch(searchId)
    if (!initialSearch) throw new Error("initialSearch is mandatory")
    console.log({ initialSearch })
    const [description, setDescription] = useState(initialSearch?.query.description || "")

    const { currentPage, cardsPerPage, cardsInRangeOfTwenty, } = useSelector((state: RootState) => state.userState);

    const pagesVisited = currentPage * cardsPerPage;
    console.log(cardType.getCards(initialSearch.resp))
    const displayCards = cardType.getCards(initialSearch.resp)
        .slice(pagesVisited, pagesVisited + cardsPerPage)
        .map((card) => <ResultPreviewCard cardType={cardType} cardData={card} />);
    
    useEffect(() => {

        console.log('cardsPerPage :>> ', cardsPerPage);
        console.log('currentPage :>> ', currentPage);
        console.log('pagesVisited :>> ', pagesVisited);

        if (!cardsInRangeOfTwenty) {
            // dispatch(userActions.handlePagination(JsonData));
        }

    }, [cardsInRangeOfTwenty])

    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    }

    return (

        <>

            <div className="headContainer mx-auto w-3/5 ">

                <button className="ml-4 text-dark-text-action flex mt-4"> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retourner aux résultats </button>

                <div className="cardTitle  mt-10 ml-4 p-2 text-base">
                    <h2 className="w-fit font-bold text-4xl">
                        <div className="flex items-center">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} <span className="bg-yellow text-3xl font-light">{`(TODO)`}</span>
                        </div>
                    </h2>
                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>

                <div className="researchContainer ml-4 p-6 flex flex-col  bg-research-precision-container">

                    <h2 className=" bold text-xl text-center text-light-accent-green">Preciser la recherche </h2>

                    <form onSubmit={() => handleOnSubmit} className="inputsContainer flex justify-center">

                        <div className="inputNumber mr-6 flex flex-col font-light ml-6 ">
                            <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                            <input className="text-white rounded-t-md w-64 h-10 addBorder-b border-2 border-light-accent-green bg-input-background " type="number" id="montantKEuro" />
                        </div>

                        <DropDown borderColor="private-investors" />

                        <div className="toggleButtons flex justify-evenly w-full ml-4">

                            {/* <ToggleButton label='Venture Capital' />
                            <ToggleButton label='Business Angel' />
                            <ToggleButton label='Business Angel' /> */}

                            <ToggleButton></ToggleButton>

                        </div>
                    </form>

                </div>

            </div>

            <div className="cardContainer flex flex-wrap justify-center mx-auto w-3/5">
                {displayCards}
            </div>

            <Pagination cursor1='1' cursor2='2' cursor3='3' cursor4='4' currentPage='1' nextPage='2' previousPage='0' />

        </>
    )
};

export default ListResearchResult;