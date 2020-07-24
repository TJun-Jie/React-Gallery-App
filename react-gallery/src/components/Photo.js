import React from 'react';

function Photo({ farm, serverId, secret,id}) {
    
    return(
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${serverId}/${id}_${secret}.jpg`} alt="" />
        </li>
    )
}
export default Photo