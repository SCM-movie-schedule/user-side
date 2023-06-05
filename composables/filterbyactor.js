export default function (actorId) {
    return {
        query: { 
            _and: [{
                    status: {
                        _eq: 'active'
                    }
                },
                {
                    movies_actors:{
                        actor:{
                            id: {
                                _eq: actorId
                            }
                        }
                    }
                }
            ],
        },
    }
                
}
