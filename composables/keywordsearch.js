export default function (keyword) {
    return {
        query: { 
            _and: [{
                    status: {
                        _eq: 'active'
                    }
                },
                {
                    _or: [{
                        title: {
                            _ilike: `%${keyword}%`
                        }
                    },
                    {
                        discrption: {
                            _ilike: `%${keyword}%`
                        }
                    }]
                }
            ],
        },
    }             
}