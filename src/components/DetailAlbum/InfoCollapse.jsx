import React from 'react'
import { RiArticleLine } from 'react-icons/ri';
import { styleIcon } from '../../constants/appConstant';
import parse from "html-react-parser";
import InfoIconLabel from './InfoIconLabel';
import { FaCompactDisc } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';
import { BsCalendar2Week } from 'react-icons/bs';

const InfoCollapse = ({ dataAlbum }) => {

    //on déclare nos constante
    const date = dataAlbum?.releaseDate ? new Date(dataAlbum?.releaseDate) : null;
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormat = date ? date.toLocaleDateString('fr-FR', options) : "-";

    return (
        <div className="rounded-2xl bg-white/5 border border-white_01 overflow-hidden mb-6">
            <h2 className="text-lg font-bold text-white px-5 py-4 border-b border-white_01">Informations</h2>
            <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-green mb-3">
                        <RiArticleLine style={styleIcon} />
                        <span className="font-semibold text-sm">Biographie</span>
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed max-w-none">
                        {dataAlbum?.artist?.biography
                            ? parse(dataAlbum?.artist?.biography)
                            : < span className="text-gray-500">Pas de biographie disponible</span>
                        }
                    </div>
                </div>
                <div className="lg:w-56 shrink-0 space-y-1">
                    <InfoIconLabel icon={{ iconName: FaCompactDisc }} label={"Album"} value={dataAlbum?.title} />
                    <InfoIconLabel icon={{ iconName: GiMicrophone }} label={"Artiste"} value={dataAlbum?.artist?.name} />
                    <InfoIconLabel icon={{ iconName: BsCalendar2Week }} label={"Sortie le"} value={dateFormat} />
                </div>
            </div>
        </div >
    )
}

export default InfoCollapse