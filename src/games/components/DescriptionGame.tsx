import { useLocation } from "react-router-dom";
import livingRoomCover2 from "../../assets/games/sword_master/living_room/living_room_cover2.jpg"
import livingRoomCover1 from "../../assets/games/sword_master/living_room/living_room_cover.png"


export const DescriptionGame = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    return (
        <div className="descriptionGameCoverMainContainer">
            <div className="descriptionGameMainContainer">
                <div
                    className="descriptionGameContainer"
                >
                    <img className="backgroundImageDescriptionGame" src={livingRoomCover2} />

                    <div className="portadeGameContainer">
                        <div className="coverGameContainer">
                            <img src={livingRoomCover1} />
                        </div>
                        <div className="infoGameContainer">
                            <div className="titleDescriptionGameContainer">
                                <div>
                                    <h1>{lastPart}</h1>
                                    <div className='starsDescriptionGameContainer'>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>

                                <div>
                                    <h3>Type:{" Object selection"} <i className="fa-solid fa-swords"></i></h3>
                                    <h3>{"Cost:"} 1 credit <i className="fa-light fa-coin"></i></h3>
                                </div>
                            </div>

                            <div className="descriptionParagraphGameContainer">
                                <h2>Description</h2>
                                <p>Immerse yourself in a captivating learning experience where you curate items within a virtual living room. Select objects such as a cozy sofa, a vibrant painting, or a stylish coffee table, and watch as the word is unveiled in both spoken English and written form. Enhance your vocabulary while exploring the comfort of a digital living space, making language acquisition an engaging and interactive journey. "Living Room Linguist" merges education with entertainment, empowering you to master English words effortlessly while creating the perfect virtual haven.</p>
                                <small>Created in: 06/april/2023</small>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div className="commentsProb">
                comments prob
            </div>
        </div>
    )
}
