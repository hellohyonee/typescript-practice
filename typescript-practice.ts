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
}

class Word { // class를 만들어서 type처럼 사용 가능, typescript의 장점!!!
  constructor(
      public term: string, // 단어
      public def: string   // 정의
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
