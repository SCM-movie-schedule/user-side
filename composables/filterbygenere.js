export default function (genreId) {
    return {
        query: { 
            _and: [{
                    status: {
                        _eq: 'active'
                    }
                },
                {
                    movies_generes:{
                        genere:{
                            id: {
                                _eq: genreId
                            }
                        }
                    }
                }
            ],
        },
    }
                
}