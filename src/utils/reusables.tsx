export const socialsIcon = (data: string) => {
    if(data === 'Facebook'){
        return '/assets/FB - ICON BUTTON.png'
    } else if (data === 'X'){
        return '/assets/X - ICON BUTTON.png'
    } else {
        return '/assets/IG - ICON BUTTON.png'
    }
}


export const promocodeIcon = (data: string) => {
    console.log(data)
    if(data === 'In-Game Rewards'){
        return <img src='/assets/Neon Headphones ICON.png' alt="" className="  w-[70px] md:w-[90px] z-10 -translate-y-6 md:-translate-y-10 absolute top-0" />
    } else if (data === 'Ticket'){
        return <img src='/assets/Ticket ICON.png' alt="" className="  w-[70px] md:w-[90px] z-10 -translate-y-6 md:-translate-y-10 absolute top-0" />
    } else {
        return <img src='/assets/Robux ICON.png' alt="" className="  w-[70px] md:w-[75px] z-10 -translate-y-6 md:-translate-y-10 absolute top-0" /> 
    }
}