export default {
    // Resolver from Query function x: do sub query using parent.y or grab arg from input 
        Query: {
            getUserById: async (parent, args, context) => {
                let { id } =args
                let { graphQLrest }= context.dataSources
                return await  graphQLrest.fetchid(id)
    
          }
    
         }
    }