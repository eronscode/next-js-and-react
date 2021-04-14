export async function getAllEvents(){
    const response =  await fetch('https://afroshop-81fe8.firebaseio.com/events.json')
    const data = await response.json();

    const events = [];
    console.log(response)
    for(const key in data){
        events.push({
            id:key,
            ...data[key]
        })
    }


    return events;
}

export async function getFeaturedEvents(){
    const allevents =  await getAllEvents();
    return allevents.filter((event) => event.isFeatured);

}

export async function getEventById(id) {
    const allevents =  await getAllEvents();
    return allevents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    
    const allevents =  await getAllEvents();
    const { year, month } = dateFilter;
    let filteredEvents = allevents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
}