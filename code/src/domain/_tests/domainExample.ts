import domain from '../index'
import infra from '../../infra'
import { Infra } from '../../interfaces/infra'

describe('exampleDomainTest', () => {
    test('example', async () => {
        let infraState = []
        const input = {
            data: 1
        }
        const mockInfra: Infra = infra({}, true, infraState)
        await domain(mockInfra).exampleFunction(input)
        
        const eventIWantToTest = 'example-event'
        const event = infraState.filter(x => x.name === eventIWantToTest')[0]
        expect(1).toBe(1)
    })
})
