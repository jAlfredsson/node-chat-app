const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen'
    var text = 'Some text'
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number')

    expect(message).toInclude({from, text})

  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 1;
    var longitude = 15;
    var url = 'https://google.com/maps?q=1,15'
    var message = generateLocationMessage(from, latitude, longitude)
    expect(message.createdAt).toBeA('number')

    expect(message).toInclude({from, url})
  })
});
