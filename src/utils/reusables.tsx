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
        return '/assets/Neon Headphones ICON.png'
    } else if (data === 'Ticket'){
        return '/assets/Ticket ICON.png'
    } else {
        return '/assets/Robux ICON.png'

    }
}