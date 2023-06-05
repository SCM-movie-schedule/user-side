export default function (name) {

    let first_name = name;
    let last_name = name
    if(name.split(' ').length > 1){
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1]
    }
    
    first_name = `%${first_name}%`,
    last_name = `%${last_name}%` 
    
    const variables = {
        query: { 
            _and: [{
                    status: {
                        _eq: 'active'
                    }
                },
                {
                    director: {
                        _or: [{
                                first_name: {
                                    _ilike: first_name
                                }
                            },
                            {
                                last_name: {
                                    _ilike: last_name
                                }
                            }
                        ]
                    }
                }
            ], 
        }
    } 

    return variables
}