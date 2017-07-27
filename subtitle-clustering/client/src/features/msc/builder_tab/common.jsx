export const propsByType = {"Extractors": {icon: 'sort numeric descending'},
                            "Dimension Reductions":{icon: 'zip'},
                            "Clustering methods":{icon: 'tags'},
                            "Analysis methods":{icon: 'unhide'},
                             "Exports":{icon: 'line chart'},
                             "Other":{icon: 'ellipsis horizontal'}}


export function getTypeForTask(types,task) {
   if (!task.name) return {}
   if (typeof types != 'object') return {}
   for (let key of Object.keys(types))
     for (let type of types[key].types)
       if (task.name == type.name)
         return {type,key}
   return {}
 }
