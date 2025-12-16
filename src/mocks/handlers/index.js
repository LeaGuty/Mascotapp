import { restHandlers } from "./restHandlers"
import { graphqlHandlers } from "./graphqlHandlers"

export const handlers = [...restHandlers, ...graphqlHandlers]