import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyCard, search, searchInvestisseur } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import Pagination from '../dsfrComponents/Pagination';
import { PitchThematicsKeywords } from '../PitchThematicsKeywords';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

const allSecteur = [
    "Numérique éco-responsable",
    "Alimentation et agriculture durables",
    "Eau, biodiversité et biomimétisme",
    "Économie circulaire",
    "Santé environnement",
    "Energies renouvelables et décarbonées",
    "Innovations maritimes et écosystèmes marins",
    "Prévention des risques",
    "Bâtiments et villes durables",
    "Décarbonation de l'industrie",
    "Mobilité durable",
    "Finance durable & RSE"
]

interface ListResearchResultProps {
    cardType: CardType
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({ cardType }) => {
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const location = useLocation();
    const initialState = location.state as (InitialState & { page?: number }) | null;


    const pageNo = initialState?.page || 1
    const navigate = useNavigate()
    useTitle(`Recherche détaillé ${cardType.title}`)

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.search.query.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || [])
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState(<></>)

    //Not available with current vesion of API
    // const [toggles, setToggles] = useState<Record<string, boolean>>({
    //     'Venture Capital': false,
    //     'Business Angel': false,
    //     'Corporate': false
    // });

    let displayCards: JSX.Element[] | undefined;
    let allCards: AnyCard[] = []
    const pageChunkSize = 20;
    if (initialState) {
        allCards = initialState.search.cards[cardType.apiName];

        displayCards = allCards.filter(x => !isInCorbeille(x))
            .slice(
                (pageNo - 1) * pageChunkSize,
                pageNo * pageChunkSize
            ).map((card) => <ResultPreviewCard pageList={false} isLoading={isLoading} cardType={cardType} cardData={card} />);
    }
    let nbPage = Math.ceil(allCards.length / pageChunkSize)
    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.length > 0) {
            setIsLoading(true)
            setErrorTxt(<></>)

            search({
                description,
                motsclefs,
                secteurs
            }).then((search) => {
                setIsLoading(false)
                return navigate(`${cardType.searchLink}/search`, {
                    replace: true,
                    state: { search }
                })
            })
            
        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    return (

        <>

            <div className="headContainer
            mt-10 mx-auto max-w-[1240px]
            xl:mx-auto
            ">

                <div className="cardTitle mt-10 ml-4 p-2 text-base">

                    <h2 className="w-fit font-bold text-xl md:text-4xl">

                        <div className="flex items-center">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} &nbsp; <span className="bg-yellow md:text-3xl font-light">{`(${allCards.length})`}</span>
                        </div>

                    </h2>

                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>


                <div className=" flex flex-col items-center w-full">
                    <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm">
                        <div className="m-auto flex justify-around mt-8 flex-wrap">
                            <PitchThematicsKeywords
                                usedDescription={[description, setDescription]}
                                usedMotsClef={[motsclefs, setMotsclef]}
                                usedSecteurs={[secteurs, setSecteurs]}
                                usedInListPage={true}
                                openPitchContainerFromStart={true}
                            />
                        </div>
                        <div className="researchContainer max-w-[1240px] w-full p-6 flex flex-col bg-research-precision-container items-center  lg:p-1">

                            <h2 className=" bold text-xl text-center mt-4" style={{ color: cardType.color }}>Preciser la recherche </h2>


                            <div className="inputsContainer p-4 flex justify-center items-middle
                            lg:justify-between lg:items-end
                            xl:justify-center">
                                <div className="my-2 flex flex-col items-center lg:flex-row lg:mb-6">
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='h-12 w-full flex justify-center items-center color'>
                        {errorTxt}
                    </div>
                    <button form="keywordsForm" disabled={isLoading} className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">{isLoading ? "Chargement..." : "rechercher !"}</span> </button>
                </div>
            </div>

            {displayCards && displayCards.length > 0 ? <div id="cardsContainer" className="cardsContainer mt-10 mx-auto max-w-[80%] flex flex-wrap justify-evenly bg 
            xl:mx-auto
            ">
                {displayCards}
            </div> : initialState ? "Aucun résultat trouvé" : null}

            {initialState && <Pagination isLoading={isLoading && nbPage > 0} onClick={() => {
                const element = document.getElementById('cardsContainer')
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
            }} currentPageNo={pageNo} baseUrl={cardType.searchLink} nbPage={nbPage} initialState={initialState} />}

        </>
    )
};

export default ListResearchResult;