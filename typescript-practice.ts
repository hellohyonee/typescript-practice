type Words = { // type 만들기
  [key: string]: string // 객체 타입을 만들어서 key와 value 설정 (각각의 type 설정 가능)
}

class Dict {
  private words: Words
  constructor() { // property를 생성하고
      this.words = {} // 원하는 대로 초기화 가능 ([], “”, boolean 등등)
  }
  add(word: Word) {   // class를 type처럼 사용 가능 
      if (this.words[word.term] === undefined) {
          this.words[word.term] = word.def
      }
  }
  def(term: string) {
      return this.words[term]
  }
  //--- 추가 메소드 만들기 ---
  del(term: string) {
    if (this.words[term] !== undefined) {
      delete this.words[term]
    }
  }
  update(word: Word) {
    if (this.words[word.term] !== undefined) {
      this.words[word.term] = word.def
    }
  }
  static hello () {  // JS문법. static 메소드 사용 가능: 클래스의 인스턴스 없이 호출 가능, 클래스가 인스턴스화되면 호출 불가.
    return 'hello';
  }
}

class Word { // class를 만들어서 type처럼 사용 가능, typescript의 장점!!!
  constructor(
      public readonly term: string, // 단어 // readonly 읽기 전용. JS에서 나타나지는 않지만 읽기전용.
      public readonly def: string   // 정의
  ) { }
}

const kimchi = new Word('kimchi', '한국의 음식');
const dict = new Dict();

dict.add(kimchi);
dict.def('kimchi'); // '한국의 음식'

const kimchiZzang = new Word('kimchi', 'kimchi is amazing food!');

dict.update(kimchiZzang);
dict.def('kimchi'); // 'kimchi is amazing food!'
dict.del('kimchi');
dict.def('kimchi'); // (undefined)


//* ------- type과 interface -------

//type
type Team = 'red' | 'blue' | 'yellow';  // 특정 값을 가지도록 type을 제한 가능
type Health = 1 | 5 | 10;
type Person = {
    nickname: string,
    team: Team,
    health: Health
}

// interface: object의 모양을 특정함
// * interface와 type의 차이점은 type이 활용성이 높다. interface는 object 전용.
interface Player {
  nickname: string,
  team: Team,
  health: Health
}

const hyone: Player = {
  nickname: 'hyon',
  team: 'yellow',
  health: 10
}

// interface 또는 & 연산자를 사용하여 type을 상속받는 방법
interface Soul{
  name: string
}
interface Gamer extends Soul {
}
// 또는
// type Gamer = User & {
// }

const tom: Gamer = {
  name: 'tom'
}

// typescript가 알아서 User의 interface를 하나로 합쳐줌
interface User2 {
  name: string
}
interface User2 {
  lastName: string
}
interface User2 {
  health: number
}

const hyonee: User2 = {
  name: 'hyonee',
  lastName: 'shin',
  health: 10
}

// * ------- interface와 class -------
abstract class User {
  constructor (
      protected nickName: string,
      protected familyName: string
  ) { }
  abstract sayHi(name:string): string
  abstract fullName(): string
}
// * 추상클래스를 만드는 이유: 표준화된 property와 메소드를 갖도록 청사진을 만드는 것
// * 하지만 추상클래스는 인스턴스를 만들 수 없고, JS에서는 일반클래스로 나타남
// * 이러한 문제점을 해결하기 위해 추상클래스를 interface로 바꿈

// 추상클래스를 interface로 바꾸면, 상속받을 때도 가볍게 변환 가능(클래스의 모양을 알려주고, JS에서는 나오지 않음)
// 클래스는 아니지만 클래스의 모양대로 특정 가능
  // * interface는 object와 class처럼 만들 수 있음
  // * interface도 type으로 사용 가능
  // * interface는 고유 사용처가 있음
// JS가 사용하지 않는 implements를 사용하여 상속을 받음 -> JS로 컴파일 했을 때 오류가 나지 않기 위해
// interface를 추가 상속할 때는 ,(콤마) 뒤에 적고 property 추가
interface User3 {
  firstName: string,
  lastName: string,
  sayHello(name:string):string,
  givenName():string
}
interface Human {
  age: number
}

class Character implements User3, Human {
  constructor (
      public firstName: string,  //!!! interface를 상속할 때 property는 private 사용불가
      public lastName: string,
      public age: number
  ) { }
  givenName() {
      return `${this.firstName} ${this.lastName}`
  }
  sayHello(name:string) {
      return `Hello ${name}. My name is ${this.givenName()}`
  }    
}

function makeUser(user: User3): User3 {
  return {
  firstName: 'hyonee',
  lastName: 'shin',
  givenName: () => `${this.firstName} ${this.lastName}`,
  sayHello: (name) => `Hello ${name}. My name is ${this.givenName()}`
  }
}

makeUser({
  firstName: 'hyonee',
  lastName: 'shin',
  givenName: () => `${this.firstName} ${this.lastName}`,
  sayHello: (name) => `Hello ${name}. My name is ${this.givenName()}`
})


// !!! 결론적으로 interface와 type의 차이는!
// * 클래스나 오브젝트의 모양을 정의하고 싶으면 ‘interface’
// * 다른 모든 경우에는 ‘type’
type PlayerA = {
  firstName: string
}
interface PlayerB {
  firstName: string
}
class UserZ implements PlayerA {
  constructor(
      public firstName: string
  ) { }
}
