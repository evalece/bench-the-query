export default {
    //update  schema if any changes
    // tut: 13:00-14:00
    Query: {
        state: async (parent, args, context) => {
            let { state } =args
            let { testData }= context.datasources
            return await  testData.fetchState(state)

      }
// Default behaviour are commented out, but for reference//
//    },
//     State: {
//        name: parent => parent.name
//         abbreviation: parent => parent.abbreviation
     }
}