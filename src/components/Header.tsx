import { useNavigate } from 'react-router-dom';
import FillButton from './dsfrComponents/FillButton';
import { protectedRoutes, publicRoutes } from './../utils';
import Trash from './../assets/icons/trash-fill.svg';
import Star from './../assets/icons/star-fill.svg';
import LogoMSG from './../assets/msg-icon.svg';
import AvatarPopOver from './customComponents/AvatarPopOver';
import { Route } from './../utils/routes';
import { useState, useEffect, useContext } from 'react';
import { appActions } from '../_actions/app.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_reducers/root.reducer';
import { ApplicationContext } from '../Router';
import { Link } from 'react-router-dom';
import { useJwtPayload } from '../jwt';
import Countdown from 'react-countdown'

interface HeaderProps {
    decouvrir?: boolean;
}

const Header = ({ decouvrir }: HeaderProps) => {
    const [burgerMenuOpen, setBurgerMenuClicked] = useState(false);
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [idc1, idc2, favoris] = usedFavoris
    const [idc3, idc4, corbeille] = usedCorbeille

    const screenWidth = useSelector((state: RootState) => state?.appState.screenWidth);
    const dispatch = useDispatch();
    const jwtPayload = useJwtPayload()
    const userIsAuth = jwtPayload != null 

    useEffect(() => {
        console.log('screenWidth :>> ', screenWidth);

        const handleResize = () => {
            dispatch(appActions.resizeScreenWidth());
        };

        window.addEventListener('resize', handleResize);

    }, [screenWidth]);

    const generatePopOverOrLoginButton = () => {
        return (
            <>
                {userIsAuth ?

                    <li className="fr-nav__item">
                        <AvatarPopOver />
                    </li>
                    :


                    <li className="fr-nav__item" >
                        <FillButton>
                            <a href="/authentification">Connexion</a>
                        </FillButton>
                    </li>

                }
            </>
        )

    }
    const generateNavLinks = (route: Route) => {

        return (
            <>
                {userIsAuth &&
                    <li key={route.key} className="fr-nav__item h-full w-full p-0">

                        <Link to={route.path} className="fr-nav__link">
                            <div className="flex">
                                {route.key === 'SELECTION' ?
                                    <img className="w-5 h-5 m-1" src={Star} alt="Ic??ne d'??toile" />
                                    :
                                    <img className="w-5 h-5 m-1" src={Trash} alt="Ic??ne de poubelle" />
                                }
                                {route.key === "ACCUEIL"}
                                <div className="flex flex-col">
                                    <p className="font-bold"> {route.name} </p>
                                    <p className="text-xs"> {route.key === 'SELECTION' ? Object.keys(favoris).length : Object.keys(corbeille).length} pistes </p>
                                </div>

                            </div>
                        </Link>

                    </li>
                }
            </>
        )

    };

    const generateNavBar = () => {

        let routesToDisplay;
        routesToDisplay = userIsAuth ? protectedRoutes : publicRoutes;

        return routesToDisplay.map((route: Route) => {

            return generateNavLinks(route);
        })
    };

    return (
        <header role="banner" className="fr-header">

            <div className="fr-header__body">
                <div className="fr-container ">
                    <div className="fr-header__body-row">
                        <div className="fr-header__brand fr-enlarge-link ">
                            <div className="fr-header__brand-top">
                                <div className="fr-header__logo">
                                    <p className="fr-logo uppercase">
                                        minist??re <br />
                                        de la transition <br />
                                        ecologique
                                    </p>
                                </div>
                                <div className="fr-header__navbar">
                                    <button onClick={() => { setBurgerMenuClicked(!burgerMenuOpen) }} className="fr-btn--menu fr-btn bg-red-200" data-fr-opened={burgerMenuOpen} aria-controls="modal-833" aria-haspopup="menu" title="Menu" id="fr-btn-menu-mobile">
                                        Menu
                                    </button>
                                </div>
                            </div>
                            <div className="fr-header__service flex">
                                <Link className="flex" to="/" title="Accueil - Mes services GreenTech - Minist??re de la transition ??cologique">
                                    <img className="h-12 mt-1 mr-2" src={LogoMSG} alt="Ic??ne d'indication, version beta " />
                                    <p className="fr-header__service-title capitalize
                                     after:rounded-sm after:content-['beta'] after:ml-2 after:relative after:bottom-1 after:w-content after:h-content after:px-1 
                                     after:text-center after:text-xs after:font-bold after:bg-beta">mes services<br /> greentech</p>
                                </Link>
                            </div>
                        </div>
                        {screenWidth >= 1024 &&

                            <div className="fr-header__tools flex justify-end">
                                <div className="">
                                    {userIsAuth && <div>
                                        {jwtPayload?.name && <span>Connected as: {jwtPayload?.name}</span>}
                                        {jwtPayload?.exp && <div>Votre lien magique expire dans <Countdown intervalDelay={1000} date={jwtPayload?.exp * 1000} renderer={countdownRenderer} /> </div>}
                                    </div>}
                                    <ul className="fr-nav__list">
                                        {/* {fr-header__tools-links} */}
                                        {decouvrir && userIsAuth ? <DecouvrirButton /> : generateNavBar()}
                                        {/* {generatePopOverOrLoginButton()} */}
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="fr-header__menu fr-modal" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
                <div className="fr-container">
                    <button className="fr-link--close fr-link" aria-controls="modal-833">Fermer</button>
                    <div className="fr-header__menu-links">
                        {decouvrir ? <DecouvrirButton /> : generateNavBar()}
                        {/* {generatePopOverOrLoginButton()} */}
                    </div>
                </div>
            </div>
        </header>
    )
}

function DecouvrirButton() {
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();

    return <button
        onClick={() => {
            setNextScrolTarget({ top: 0 })
            navigate('/explorer')
        }}
        className="
fr-btn fr-btn--primary
my-2 mx-3 py-0 h-full
hover:bg-claire-bf__hover flex justify-between"
    >
        <span>D??couvrir</span>
        <span className="fr-fi-arrow-right-line ml-1 mt-1" aria-hidden="true"></span>
    </button>
}

type CountdownRendererType = (o:{days: any, hours: any, minutes: any,seconds: any,completed: any}) => JSX.Element
const countdownRenderer : CountdownRendererType  = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        document.location.href='/'
    } else {
        // Render a countdown
        return <span>{days}j {hours%24}h {minutes}min {seconds}sec</span>;
    }
    return <></>
};

export default Header;