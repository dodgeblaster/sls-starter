import io from '../io'
import infra from '../infra'
import domain from '../domain'

const builtDomain = domain(infra(io()))

// API REQUEST RESPONSE
export const exampleFunction = async (event, context, callback) => {
    const result = await builtDomain(infra).exampleFunction(event)
    return io.httpOut(result)
}

// SNS TRIGGERS
export const exampleSnsTriggeredFunction = async (event, context, callback) => {
    const data = io().input.sns(event)))
    await builtDomain(infra).exampleSnsTriggeredFunction(data)
    return true
}

// SCHEDULED TRIGGERS
export const checkCompileList = async (event, context, callback) => {
    await builtDomain(infra).exampleCronTriggeredFunction()
    return true
}
