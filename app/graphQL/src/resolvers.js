//Subquery happens in resolver
export default {
    // Resolver from Query function x: do sub query using parent.y or grab arg from input 
        Query: {
            getUserById: async (parent, args, context) => {
                let { id } =args
                let { testData }= context.dataSources
                return await  testData.fetchid(id)
    
          }
    
         }
    }



    