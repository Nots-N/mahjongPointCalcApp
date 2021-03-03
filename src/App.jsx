import React from 'react';
import './assets/styles/style.css';
import getMinOfArray from './getMinOfArray';
import {SelectButtonsComponent,HaiList,KazeList,TenhoList,HaiteiList,RichiList,AnkanList,HuroHaiList,AgarihaiChaList,ToggleButtonComponent,ResultWindow,HaiSelectTabs} from './components/index.js';
import {haiNumSets} from './assets/datasets/index.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tehai:[],//和了時の手牌（副露牌除く）
      agarihai:{},//上がり牌とどこから持ってきたか
      huro:[],//副露牌オブジェクトの配列
      ankan:[],//暗槓の牌リスト(tehaiには含めずこちらにのみ表記)
      baKaze:0,//場風
      jiKaze:0,//自風
      richiBo:0,//リーチ棒の点数合計
      kyotakuBo:0,//供託棒の点数合計
      dora:[0],//ドラ牌(表示牌ではなくそのもの)
      uradora:[0],//裏ドラ牌(表示牌ではなくそのもの)
      akadora:0,//赤ドラ枚数
      richi:0,// 1: 立直, 2: ダブル立直、３オープンリーチ
      ippatsu:false,//一発
      chankan:false,//槍槓
      rinshan:false,//嶺上開花
      haitei:0,// 1: 海底摸月, 2: 河底撈魚
      tenho:0,//  1: 天和, 2: 地和
      canKuitan:false,//喰タンOK？
      result:{},//飜数、符、点、点数移動が表示される。hansu:,hu:,point:,pointMoving:[0:,1:,2:,3:]
      yaku:[],//役の一覧を文字列で格納した配列
    }
    this.selectKaze = this.selectKaze.bind(this);
    this.setCanKuitan = this.setCanKuitan.bind(this);
    this.setHaitei = this.setHaitei.bind(this);
    this.addTehai = this.addTehai.bind(this);
    this.removeTehai = this.removeTehai.bind(this);
    this.resetTehai = this.resetTehai.bind(this);
    this.addDora = this.addDora.bind(this);
    this.removeDora = this.removeDora.bind(this);
    this.addUradora = this.addUradora.bind(this);
    this.removeUradora = this.removeUradora.bind(this);
    this.addAnkan = this.addAnkan.bind(this);
    this.removeAnkan = this.removeAnkan.bind(this);
    this.setChankan = this.setChankan.bind(this);
    this.setRinshan = this.setRinshan.bind(this);
    this.setTenho = this.setTenho.bind(this);
    this.setIppatsu = this.setIppatsu.bind(this);
    this.setRichi = this.setRichi.bind(this);
    this.addHuro = this.addHuro.bind(this);
    this.removeHuro = this.removeHuro.bind(this);
    this.setAgarihaiCha = this.setAgarihaiCha.bind(this);
    this.setAgarihaiHai = this.setAgarihaiHai.bind(this);
    this.resetHai = this.resetHai.bind(this);
    // 牌ID
    // 一萬〜九萬：１〜９
    // 一筒〜九筒：１１〜１９
    // 一索〜九索：２１〜２９
    // 東西南北白發中：３１〜３７
  }

  initState=()=>{
    const tehai = [1,2,3,11,12,13,37,37];//副露牌,暗槓牌を除いた手牌
    const agarihai = {hai:37, ie:"toi"};
    const huro = [{oneMentsu:[21,22,23], ie:"toi", hai:23}];//副露牌オブジェクトの配列
    const ankan = [19];
    const baKaze = 31;//場風
    const jiKaze = 31;//自風
    const richi = 0;// 1: 立直, 2: ダブル立直、３オープンリーチ

    // const tehai = [1,1,2,2,3,3,11,11,12,12,13,13,37,37];//副露牌,暗槓牌を除いた手牌
    // const agarihai = {hai:37, ie:"toi"};
    // const huro = [];//副露牌オブジェクトの配列
    // const ankan = [];
    // const baKaze = 31;//場風
    // const jiKaze = 32;//自風
    // const richi = 0;// 1: 立直, 2: ダブル立直、３オープンリーチ

    const richiBo = 0;//リーチ棒の点数合計
    const kyotakuBo = 0;//供託棒の点数合計
    const dora = [0];//ドラ牌
    const uradora = [0];//裏ドラ牌
    const akadora = 0;//赤ドラ枚数
    const ippatsu = false;//一発
    const chankan = false;//槍槓
    const rinshan = false;//嶺上開花
    const haitei = 0;// 1: 海底摸月, 2: 河底撈魚
    const tenho = 0;//  1: 天和, 2: 地和
    const canKuitan = false;
    const result = {};
    const yaku = [];
    this.setState({
      tehai:tehai,//和了時の手牌(14牌)
      agarihai:agarihai,//上がり牌とどこから持ってきたか
      huro:huro,//副露牌オブジェクトの配列
      ankan:ankan,
      baKaze:baKaze,//場風
      jiKaze:jiKaze,//自風
      richiBo:richiBo,//リーチ棒の点数合計
      kyotakuBo:kyotakuBo,//供託棒の点数合計
      dora:dora,//ドラ牌
      uradora:uradora,//裏ドラ牌
      akadora:akadora,//赤ドラ枚数
      richi:richi,// 1: 立直, 2: ダブル立直、３オープンリーチ
      ippatsu:ippatsu,//一発
      chankan:chankan,//槍槓
      rinshan:rinshan,//嶺上開花
      haitei:haitei,// 1: 海底摸月, 2: 河底撈魚
      tenho:tenho,//  1: 天和, 2: 地和
      canKuitan:canKuitan,
      result:result,//飜数、符、点、点数移動が表示される。hansu:,hu:,point:,pointMoving:[0:,1:,2:,3:]
      yaku:yaku,
    })
  }

  componentDidMount(){
    this.initState();
    console.log('componentDidMount:');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate:');
    //連想配列。mentsuList:面子配列の配列、machiIndexList:待ちインデックスの配列。
    const mentsuMachiIndexList = this.getAgariList(this.state.tehai,this.state.huro,this.state.ankan);
    const hansuYakuList = this.getHansuYakuList(mentsuMachiIndexList.mentsuList,mentsuMachiIndexList.machiIndexList);
    const huList = this.getHuList(hansuYakuList,mentsuMachiIndexList.mentsuList,mentsuMachiIndexList.machiIndexList);
    const resultYakuArr = this.getResult(hansuYakuList, huList);//[結果Obj,役Arr]
    if(JSON.stringify(this.state.result,null,'\t') !== JSON.stringify(resultYakuArr[0],null,'\t')){//無限に実行されるのを防ぐ
      this.setState({
        result:resultYakuArr[0],
        yaku:resultYakuArr[1],
      })
    }
  }


  getAgariList(tehai,huro,ankan){
    const uniqueTehai = Array.from(new Set(tehai));//重複を削除した手牌を作成。
    let mentsu=[];//作成した面子一覧を格納する2次元配列。
    let mentsuList = [];//作成した面子一覧(mentsu)のリストを格納する３次元配列。
    let machiIndexList = [];//作成したmentsu内において、待ちの面子はどこかをインデックスで示す。
    let mentsuMachiIndexList;//返り値
    const huroMentsu = huro.map(x=>x.oneMentsu);
    const ankanMentsu = [];
    ankan.forEach((x)=>{
      ankanMentsu.push(new Array(4).fill(x));
    });
    //雀頭確認（２牌以上の牌を探索）。雀頭(jantoh)と雀頭を除いた手牌(cuttingTehai)を作成する。
    uniqueTehai.forEach(jantoh=>{
      const headCount = tehai.filter(x=>x===jantoh).length;//各牌の枚数算出。
      let cuttingTehai = Array.from(tehai);//手牌をコピー（普通に＝でつなぐと参照渡しになる点に注意）。
      if(headCount>=2){
        cuttingTehai.splice(cuttingTehai.indexOf(jantoh),1);//雀頭一枚削除。
        cuttingTehai.splice(cuttingTehai.indexOf(jantoh),1);

        //面子のリスト(刻子優先)を作成し、作成できればmentsuListにpush。
        mentsu = Array.from(this.getMentsuList(Array.from(cuttingTehai),[[jantoh,jantoh],...huroMentsu,...ankanMentsu],true));
        if(mentsu.length===5){
          for(let i=0;i<5;i++){//和了牌の取り方でできる面子の数だけ、面子とindexを保存（待ちによって点数が異なる可能性があるため)
            if(mentsu[i].some((x)=>x===this.state.agarihai.hai)){//
              mentsuList.push(mentsu);
              machiIndexList.push(i);
            }
          }
        }

        //面子のリスト(順子優先)を作成。作成でき、且つ刻子優先時と結果が異なれば、mentsuListにpush
        mentsu = Array.from(this.getMentsuList(Array.from(cuttingTehai),[[jantoh,jantoh],...huroMentsu,...ankanMentsu],false));//面子のリストを作成する。(順子優先)
        //面子リスト(刻子優先)が作成できた場合でも、指定された和了牌が面子に含まれていない場合、
        //そもそも順子優先時にmentsuListにPushできておらず、mentsuListが空の状態で、その中身を参照できずエラーになるため、
        //mentsuListがundefinedになっていないかどうかも判断している。
        if(mentsu.length===5 && mentsuList.length!==0 && this.isArray2DEqualDeepToString(Array.from(mentsuList[mentsuList.length-1]).sort(),Array.from(mentsu).sort())){
          for(let i=0;i<5;i++){
            if(mentsu[i].some((x)=>x===this.state.agarihai.hai)){
              mentsuList.push(mentsu);
              machiIndexList.push(i);
            }
          }
        }
      }
    });

    //七対子形判定
    if(uniqueTehai.length===7 && huroMentsu.length===0){
      let chitoiMentsu = [];
      let chitoiMachiIndex = 0;
      for(let i=0; i<7; i++){
        if(tehai.filter(x=>x===uniqueTehai[i]).length===2){
          chitoiMentsu.push([uniqueTehai[i],uniqueTehai[i]]);
        }
        if(uniqueTehai[i]===this.state.agarihai.hai){
          chitoiMachiIndex = i;
        }
      }
      if(chitoiMentsu.length===7){
        mentsuList.push(chitoiMentsu);
        machiIndexList.push(chitoiMachiIndex);
      }
    }

    //国士無双形判定
    if(this.isIncludeOver(tehai,[1,9,11,19,21,29,31,32,33,34,35,36,37],[1,1,1,1,1,1,1,1,1,1,1,1,1])){
      mentsuList.push(tehai.map(x=>[x]));
      machiIndexList.push(tehai.indexOf(this.state.agarihai.hai));
    }
    mentsuMachiIndexList = {mentsuList:mentsuList,machiIndexList:machiIndexList};
    return mentsuMachiIndexList;
  }

  getMentsuList(cuttingTehai,mentsu,kotsuPriBool){
    if(cuttingTehai.length===0)return mentsu;
    const uniqueTehai = Array.from(new Set(cuttingTehai));
    let haiMin = getMinOfArray(uniqueTehai);//手牌の中から最小の手牌を選ぶ。
    //槓子判断

    //刻子判断(刻子優先の場合は順子判断より先に刻子判断を行う)
    if(cuttingTehai.filter(x=>x===haiMin).length>=3 && kotsuPriBool){
      mentsu.push([haiMin,haiMin,haiMin]);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      mentsu = this.getMentsuList(cuttingTehai,mentsu);
      return mentsu;
    }

    //順子判断
    if(haiMin<30 && cuttingTehai.indexOf(haiMin+1)>=0 && cuttingTehai.indexOf(haiMin+2)>=0){
      mentsu.push([haiMin,haiMin+1,haiMin+2]);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin+1),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin+2),1);
      mentsu = this.getMentsuList(cuttingTehai,mentsu);
      return mentsu;
    }

    //順子優先の場合は順子判断より後に刻子判断を行う。
    if(cuttingTehai.filter(x=>x===haiMin).length>=3 && !kotsuPriBool){
      mentsu.push([haiMin,haiMin,haiMin]);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      cuttingTehai.splice(cuttingTehai.indexOf(haiMin),1);
      mentsu = this.getMentsuList(cuttingTehai,mentsu);
      return mentsu;
    }

    //最後の行まできた===面子が完成していないので[]を返す。
    if(cuttingTehai.length>0)return [];
  }

  getHansuYakuList(mentsuList,machiIndexList){
    let hansuYakuList = [];
    //面子ごとに飜数を計算していく。(mentsu[0]は雀頭)
    for(let listIndex=0; listIndex<mentsuList.length; listIndex++){
      const mentsu = Array.from(mentsuList[listIndex]);
      const machi = machiIndexList[listIndex];
      let yakuList = [];//該当役をプッシュ(役満が無ければこれをhansuYakuListにプッシュ)。
      let yakumanList = [];//該当役満をプッシュ(役満があればこれをhansuYakuListにプッシュ)
      let hansu = 0;
      let yakuman = 0;
      const huroNum = this.state.huro.length;
      const mentsuFlatList = mentsu.reduce((pre,crr)=>{pre.push(...crr);return pre;},[]);//面子をフラットな１次元配列に。
      //七対子形か判定
      let isChitoi = false;
      isChitoi = mentsu[1].length===2;
      
      //刻子と槓子の数をカウント。(刻子の数は槓子も含んだ数)
      let kotsuNum = 0;
      let kantsuNum = 0;
      for(let i=1;i<5;i++){
        const oneMentsuDup = mentsu[i].filter(x=> x === mentsu[i][0]).length//1面子中の1枚目と同じ枚数。
        if(oneMentsuDup === 3 || oneMentsuDup === 4){//3枚または４枚ダブりなら刻子
          kotsuNum++;
        }
        if(oneMentsuDup === 4){//４枚ダブりなら槓子
          kantsuNum++;
        }
      }
      //七対子形でなければ、順子の数は4面子-刻子の数
      let shuntsuNum = 0;
      if(!isChitoi){
        shuntsuNum = 4 - kotsuNum;
      }
      
      //役満判定＆一緒に判断できる役(七対子、清一色、対々和)判定
      if(isChitoi){
        if(this.isIncludeOver(mentsuFlatList,[12,13,14,15,16,17,18],[2,2,2,2,2,2,2])){
          yakuman+=1;//大車輪
          yakumanList.push("大車輪");
          console.log("大車輪");
        }else{
          hansu+=2;//七対子
          yakuList.push("七対子");
          console.log("七対子");
        }
      }
      if(this.isOnly(mentsuFlatList,[22,23,24,26,28,36])){
        yakuman+=1;//緑一色
        yakumanList.push("緑一色");
        console.log("緑一色");
      }
      if(this.isIncludeOver(mentsuFlatList,[35,36,37],[3,3,3])){
        yakuman+=1;//大三元
        yakumanList.push("大三元");
        console.log("大三元");
      }
      if(this.isIncludeOver(mentsuFlatList,[1,9,11,19,21,29,31,32,33,34,35,36,37],[1,1,1,1,1,1,1,1,1,1,1,1,1])){
        let kokushiJusanmen = Array.from(mentsuFlatList);
        kokushiJusanmen.splice(kokushiJusanmen.indexOf(this.state.agarihai.hai),1);
        if(this.isIncludeOver(kokushiJusanmen,[1,9,11,19,21,29,31,32,33,34,35,36,37],[1,1,1,1,1,1,1,1,1,1,1,1,1])){
          yakuman+=2;//国士無双(13面待ち)
          yakumanList.push("国士無双(13面待ち)");
          console.log("国士無双(13面待ち)");
        }else{
          yakuman++;//国士無双
          yakumanList.push("国士無双");
          console.log("国士無双");
        }
      }
      if(this.isOnly(mentsuFlatList,[1,9,11,19,21,29])){
        yakuman+=1;//清老頭
        yakumanList.push("清老頭");
        console.log("清老頭");
      }else if(this.isOnly(mentsuFlatList,[31,32,33,34,35,36,37])){
        yakuman+=1;//字一色
        yakumanList.push("字一色");
        console.log("字一色");
      }else if(this.isOnly(mentsuFlatList,[1,9,11,19,21,29,31,32,33,34,35,36,37])){
        hansu+=2;//混老頭
        yakuList.push("混老頭");
        console.log("混老頭");
      }else{
        const junchanChantaNum = this.isJunchanChanta(mentsu);
        if(junchanChantaNum===1){
          if(huroNum===0){
            hansu+=3//純全帯么九(門前)
            yakuList.push("純全帯么九(門前)");
            console.log("純全帯么九(門前)");
          }else{
            hansu+=2;//純全帯么九(喰い下がり)
            yakuList.push("純全帯么九(喰い下がり)");
            console.log("純全帯么九(喰い下がり)");
          }
        }else if(junchanChantaNum===2){
          if(huroNum===0){
            hansu+=2;//混全帯么九(門前)
            yakuList.push("混全帯么九(門前)");
            console.log("混全帯么九(門前)");
          }else{
            hansu+=1;//混全帯么九(喰い下がり)
            yakuList.push("混全帯么九(喰い下がり)");
            console.log("混全帯么九(喰い下がり)");
          }
        }
      }
      if(this.isIncludeOver(mentsuFlatList,[31,32,33,34],[3,3,3,3])){
        yakuman += 2;//大四喜
        yakumanList.push("大四喜");
        console.log("大四喜");
      }else if(this.isIncludeOver(mentsuFlatList,[31,32,33,34],[3,3,3,2])||this.isIncludeOver(mentsuFlatList,[31,32,33,34],[3,3,2,3])||this.isIncludeOver(mentsuFlatList,[31,32,33,34],[3,2,3,3])||this.isIncludeOver(mentsuFlatList,[31,32,33,34],[2,3,3,3])){
        yakuman++;//小四喜(小四喜と大四喜は重複しない)
        yakumanList.push("小四喜");
        console.log("小四喜");
      }
      if(this.isOnly(mentsuFlatList,[1,2,3,4,5,6,7,8,9])||this.isOnly(mentsuFlatList,[11,12,13,14,15,16,17,18,19])||this.isOnly(mentsuFlatList,[21,22,23,24,25,26,27,28,29])){
        if(huroNum === 0){
          if(this.isIncludeOver(mentsuFlatList,[1,2,3,4,5,6,7,8,9],[3,1,1,1,1,1,1,1,3])||this.isIncludeOver(mentsuFlatList,[11,12,13,14,15,16,17,18,19],[3,1,1,1,1,1,1,1,3])||this.isIncludeOver(mentsuFlatList,[21,22,23,24,25,26,27,28,29],[3,1,1,1,1,1,1,1,3])){
            if(kantsuNum===0){
              let junseChurenTenpai = Array.from(mentsuFlatList);
              junseChurenTenpai.splice(mentsuFlatList.indexOf(this.state.agarihai.hai),1)
              if(this.isIncludeOver(junseChurenTenpai,[1,2,3,4,5,6,7,8,9],[3,1,1,1,1,1,1,1,3])||this.isIncludeOver(junseChurenTenpai,[11,12,13,14,15,16,17,18,19],[3,1,1,1,1,1,1,1,3])||this.isIncludeOver(junseChurenTenpai,[21,22,23,24,25,26,27,28,29],[3,1,1,1,1,1,1,1,3])){
                yakuman+=2;//純正九連宝燈(暗槓も認めない)
                yakumanList.push("純正九連宝燈");
                console.log("純正九連宝燈");
              }else{
                yakuman++;//九連宝燈(暗槓も認めない)
                yakumanList.push("九連宝燈");
                console.log("九連宝燈");
              }
            }else{
              hansu += 6;//門前清一色(九連宝燈並びの暗槓ありVer)
              yakuList.push("清一色(門前)");
              console.log("清一色(門前)");
            }
          }else{
            hansu += 6;//門前清一色
            yakuList.push("清一色(門前)");
            console.log("門前清一色");
          }
        }else{
          hansu += 5;//鳴き清一色
          yakuList.push("清一色(喰い下がり)");
          console.log("鳴き清一色");
        }
      }else if(this.isOnly(mentsuFlatList,[1,2,3,4,5,6,7,8,9,31,32,33,34,35,36,37])||this.isOnly(mentsuFlatList,[11,12,13,14,15,16,17,18,19,31,32,33,34,35,36,37])||this.isOnly(mentsuFlatList,[21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37])){
        if(huroNum===0){
          hansu+=3;//混一色(門前)
          yakuList.push("混一色(門前)");
          console.log("混一色(門前)");
        }else{
          hansu+=2;//混一色(喰い下がり)
          yakuList.push("混一色(喰い下がり)");
          console.log("混一色(喰い下がり)");
        }
      }

      if(kantsuNum===4){
        yakuman++;//四槓子
        yakumanList.push("四槓子");
        console.log("四槓子");
      }
      if(kotsuNum===4){
        if(huroNum===0){
          if(mentsu[machi].length===2){
            yakuman+=2;//四暗刻単騎待ち
            yakumanList.push("四暗刻(単騎待ち)");
            console.log("四暗刻(単騎待ち)");
          }else if(this.state.agarihai.ie==="ji"){
            yakuman++;//四暗刻
            yakumanList.push("四暗刻");
            console.log("四暗刻");
          }else{
            hansu+=2;//対々和
            yakuList.push("対々和");
            console.log("対々和");
          }
        }else{
          hansu+=2;//対々和
          yakuList.push("対々和");
          console.log("対々和");
        }
      }

      if(this.state.tenho===1){
        yakuman++;//天和
        yakumanList.push("天和");
        console.log("天和");
      }else if(this.state.tenho===2){
        yakuman++;//地和
        yakumanList.push("地和");
        console.log("地和");
      }

      let doraNum = 0;
      let uradoraNum = 0;
      let akadoraNum = 0;
      //役満ならそれ以外の計算負荷をかけない。
      if(yakuman===0){
        //--------通常役--------
        //役牌(含むタブ東、ダブ南)
        if(kotsuNum>=1){
          const yakuhaiList = [[35,35,35],[36,36,36],[37,37,37],new Array(3).fill(this.state.baKaze),new Array(3).fill(this.state.jiKaze),[35,35,35,35],[36,36,36,36],[37,37,37,37],new Array(4).fill(this.state.baKaze),new Array(4).fill(this.state.jiKaze)];
          for(let i=1; i<5; i++){
            if(this.isEqualOneOfThem(mentsu[i],yakuhaiList)){
              hansu++;
              yakuList.push("役牌");
              console.log("役牌");
            }
          }
        }

        if(kantsuNum===3){
          hansu+=2;//三槓子
          yakuList.push("三槓子");
          console.log("三槓子");
        }
        if(this.state.canKuitan || huroNum===0){//断么九（喰い断么九含む）
          if(this.isOnly(mentsuFlatList,[2,3,4,5,6,7,8,12,13,14,15,16,17,18,22,23,24,25,26,27,28])){
            hansu++;
            yakuList.push("断么九");
            console.log("断么九");
          }
        }

        if(this.isIncludeOver(mentsuFlatList,[35,36,37],[2,2,2]) && !isChitoi){
          hansu+=2;//小三元
          yakuList.push("小三元");
          console.log("小三元");
        }

        //萬子、筒子、索子関係なく、数字(つまり下一桁)だけ抽出。三色同順、三色同刻の判定、平和両面待ち判定で利用。
        //字牌の場合はそのまま(東東東が[1,1,1]のように判定されると困るため)。
        //比較用にStringに各面子をStringに変換しておく。
        const oneDigitMentsuString = mentsu.map((oneMentsu)=>{
          if(oneMentsu[0]>30){
            return oneMentsu.toString();
          }else{
            return oneMentsu.map(oneHai => oneHai % 10).toString();
          }
        });

        if(kotsuNum>=3){
          //三色同刻
          //雀頭除いた4面子のうちダブっている一桁目面子が３つあればOK。雀頭除いた一つ目の面子と二つ目の面子で調べれば十分。
          if(oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[1]).length===3
          ||oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[2]).length===3){
            hansu+=2;
            yakuList.push("三色同刻");
            console.log("三色同刻");
          }

          //三暗刻
          //刻子4つ:副露0。副露１ツモ。副露１単騎待ちロン。
          //刻子3つ（例：11 222 333 444 678 ）
          //０副露の場合：ツモ。シャボ待ち以外（単騎待ち、両面待ち、嵌張待ち、辺張待ち）ロン
          //１副露の場合：副露が順子で、ツモまたは単騎待ちロン
          let isSananko = false;
          if(kotsuNum===4){
            if(huroNum===0){
              isSananko = true;
            }else if(huroNum===1){
              if(this.state.agarihai.ie==="ji" || mentsu[machi].length===2){
                isSananko = true;
              }
            }
          }else if(kotsuNum===3){
            if(huroNum===0){
              if(this.state.agarihai.ie==="ji" || !(mentsu[machi].length===3 && mentsu[machi][0]===mentsu[machi][1])){
                isSananko = true;
              }
            }else if(huroNum===1){
              if(this.state.huro[0].oneMentsu[0]!==this.state.huro[0].oneMentsu[1] && (this.state.agarihai.ie==="ji"||mentsu[machi].length===2)){
                isSananko = true;
              }
            }
          }
          if(isSananko){
            hansu+=2;
            yakuList.push("三暗刻");
            console.log("三暗刻");
          }
        }

        //同じ面子の数は一盃口、二盃口、三色同順の判定に利用する。
        let sameMentsuNum = 0;
        for(let i=1;i<4;i++){
          for(let j=i+1;j<5;j++){
            if(mentsu[i].toString()===mentsu[j].toString()){
              sameMentsuNum++;
            }
          }
        }
        if(huroNum===0){//門前役や喰い下がり役門前時の計算
          //一盃口（雀頭含む5面子のうち、同じ面子が2個か3個ある（刻子で同じ面子が存在することはない））
          //二盃口（雀頭含む5面子のうち、同じ面子が2個2個ある（４個の場合は四暗刻なので二盃口にならない））
          if(sameMentsuNum===1||sameMentsuNum===3){
            hansu++;//一盃口
            yakuList.push("一盃口");
            console.log("一盃口");
          }else if(sameMentsuNum===2){
            hansu+=3;//二盃口
            yakuList.push("二盃口");
            console.log("二盃口");
          }
          if(shuntsuNum>=3){
            //三色同順(門前)
            //同じ面子が無ければ一桁目面子が３ダブりのみでOK（雀頭除いた一つ目の面子と二つ目の面子で調べれば十分）
            //(同じ面子がないので一桁目面子が4ダブりにはならない)。
            //ただし同じ面子が1組ある場合(門前なら一盃口)は4ダブりが必要で、2個2組ある場合(門前なら二盃口)や3個1組ある場合は三色同順にはならない。
            if(sameMentsuNum===0 && (oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[1]).length===3
            ||oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[2]).length===3)){
              hansu+=2;
              yakuList.push("三色同順(門前)");
              console.log("三色同順(門前)");
            }else if(sameMentsuNum===1 && oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[1]).length===4){
              hansu+=2;
              yakuList.push("三色同順(門前)");
              console.log("三色同順(門前)");
            }
            //一気通貫(門前)。（isIncludeOver(,1~9)では、123|345|567|789のような面子も一気通貫と判断してしまうのでNG。
            if((this.isArray2DInArray(mentsu,[1,2,3]) && this.isArray2DInArray(mentsu,[4,5,6]) && this.isArray2DInArray(mentsu,[7,8,9]))
            ||(this.isArray2DInArray(mentsu,[11,12,13]) && this.isArray2DInArray(mentsu,[14,15,16]) && this.isArray2DInArray(mentsu,[17,18,19]))
            ||(this.isArray2DInArray(mentsu,[21,22,23]) && this.isArray2DInArray(mentsu,[24,25,26]) && this.isArray2DInArray(mentsu,[27,28,29]))){
              hansu+=2;
              yakuList.push("一気通貫(門前)");
              console.log("一気通貫(門前)");
            }
          }

          //平和
          const yakuhaiJantohList = [[35,35],[36,36],[37,37],new Array(2).fill(this.state.baKaze),new Array(2).fill(this.state.jiKaze)];
          let isPinhu = false;
          const machiMentsuOneDigitString = mentsu[machi].map((x)=>x%10).toString();
          if(shuntsuNum===4){
            if(!this.isEqualOneOfThem(mentsu[0],yakuhaiJantohList)){//雀頭が役牌ならNG
              if(mentsu[machi].length===3 && mentsu[machi].indexOf(this.state.agarihai.hai)!==1){//シャボ待ち、嵌張待ち除外
                if(!(machiMentsuOneDigitString===[1,2,3].toString && this.state.agarihai.hai%10===3)
                &&!(machiMentsuOneDigitString===[7,8,9].toString && this.state.agarihai.hai%10===7)){//辺張待ち除外
                  isPinhu = true;
                }
              }
            }
          }
        if(isPinhu){
            hansu++;
            yakuList.push("平和");
            console.log("平和");
          }
        }else{//喰い下がり役計算
          if(shuntsuNum>=3){
            //三色同順(門前)
            //同じ面子が無ければ一桁目面子が３ダブりでOK（雀頭除いた一つ目の面子と二つ目の面子で調べれば十分）。
            //ただし同じ面子が2個ある場合(門前なら一盃口)は4ダブりが必要で、2個2個ある場合(門前なら二盃口)は三色同順にはならない。
            if(oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[1]).length===3
            ||oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[2]).length===3){
              hansu++;
              yakuList.push("三色同順(喰い下がり)");
              console.log("三色同順(喰い下がり)");
            }else if(sameMentsuNum===1 && oneDigitMentsuString.filter(x=>x===oneDigitMentsuString[1]).length===4){
              hansu++;
              yakuList.push("三色同順(喰い下がり)");
              console.log("三色同順(喰い下がり)");
            }

            //一気通貫(喰い下がり)
            if((this.isArray2DInArray(mentsu,[1,2,3]) && this.isArray2DInArray(mentsu,[4,5,6]) && this.isArray2DInArray(mentsu,[7,8,9]))
            ||(this.isArray2DInArray(mentsu,[11,12,13]) && this.isArray2DInArray(mentsu,[14,15,16]) && this.isArray2DInArray(mentsu,[17,18,19]))
            ||(this.isArray2DInArray(mentsu,[21,22,23]) && this.isArray2DInArray(mentsu,[24,25,26]) && this.isArray2DInArray(mentsu,[27,28,29]))){
              hansu++;
              yakuList.push("一気通貫(喰い下がり)");
              console.log("一気通貫(喰い下がり)");
            }
          }
        }

        //--------状況役(天和・地和以外)--------
        if(this.state.richi===1){
          hansu++;// 立直
          yakuList.push("立直");
          console.log("立直");
        }else if(this.state.richi===2){
          hansu+=2;//ダブルリーチ、オープンリーチ
          yakuList.push("ダブルリーチ");
          console.log("ダブルリーチ");
        }else if(this.state.richi===3){
          hansu+=2;//オープンリーチ
          yakuList.push("オープンリーチ");
          console.log("オープンリーチ");
        }
        if(this.state.ippatsu){
          hansu++;// 一発
          yakuList.push("一発");
          console.log("一発");
        }
        if(this.state.rinshan){
          hansu++;// 嶺上開花
          yakuList.push("嶺上開花");
          console.log("嶺上開花");
        };
        if(this.state.chankan){
          hansu++;// 槍槓
          yakuList.push("槍槓");
          console.log("槍槓");
        }
        if(this.state.haitei===1){
          hansu++;// 海底摸月
          yakuList.push("海底摸月");
          console.log("海底摸月");
        }else if(this.state.haitei===2){
          hansu++;//河底撈魚
          yakuList.push("河底撈魚");
          console.log("河底撈魚");
        }
        if(this.state.agarihai.ie==="ji" && huroNum===0){
          hansu++;// 門前清自摸和
          yakuList.push("門前清自摸和");
          console.log("門前清自摸和");
        }

        //--------懸賞役--------
        this.state.dora.forEach(doraHai=>{
          hansu += mentsuFlatList.filter(x=> x===doraHai).length;//ドラ
          doraNum += mentsuFlatList.filter(x=> x===doraHai).length;
        });
        this.state.uradora.forEach(doraHai=>{
          hansu += mentsuFlatList.filter(x=> x===doraHai).length;//裏ドラ
          uradoraNum += mentsuFlatList.filter(x=> x===doraHai).length;
        });
        hansu += this.state.akadora;//赤ドラ
        akadoraNum = this.state.akadora;
        
        if(yakuman === 0 && hansu >= 13){//数え役満
          yakuman = 1;
          console.log("数え役満");
        }
      }

      if(yakuman>0){//役満時
        hansuYakuList.push({hansu:yakuman*13,yakuList:yakumanList});
      }else if(yakuList.length === 0){//役無し時
        hansuYakuList.push({hansu:0,yakuList:["役無し"]});
      }else{//通常役あり時
        yakuList.push("ドラ : " + doraNum);
        yakuList.push("裏ドラ : " + uradoraNum);
        yakuList.push("赤ドラ : " + akadoraNum);
        console.log("ドラ : " + doraNum);
        console.log("裏ドラ : " + uradoraNum);
        console.log("赤ドラ : " + akadoraNum);
        hansuYakuList.push({hansu:hansu,yakuList:yakuList});
      }
      console.log("========================");
    }
    return hansuYakuList;
  }

  //符を計算する関数。役無しと５飜以上の場合は符を計算する必要がないため0とする。
  getHuList(hansuYakuList,mentsuList,machiIndexList){
    let huList = [];
    const huroMentsu = this.state.huro.map(x=>x.oneMentsu);
    const yaochu = [1,9,11,19,21,29,31,32,33,34,35,36,37];
    for(let i=0; i<mentsuList.length; i++){
      const mentsu = Array.from(mentsuList[i]);
      const machi = machiIndexList[i];
      const hansu = hansuYakuList[i].hansu;
      const yaku = Array.from(hansuYakuList[i].yakuList);
      let hu = 20;//基礎点
      if(yaku[0]==="役無し"|| hansu>=5){
        huList.push(0);
      }else if(yaku.some((x)=>x==="平和") && this.state.agarihai.ie==="ji"){
        huList.push(20);//喰い平和は最後まで20符だったら処理。
      }else if(yaku.some((x)=>x==="七対子")){
        huList.push(25);
      }else{
        if(this.state.huro.length === 0 && this.state.agarihai.ie !== "ji"){
          hu += 10;//門前加符
        }else if(this.state.agarihai.ie === "ji"){
          hu += 2;//ツモ符
        }
        if(this.isOnly(mentsu[0],[35,36,37,this.state.baKaze,this.state.jiKaze])){
          hu += 2;//雀頭
        }

        let huroKotsuMentsuList = [];
        this.state.huro.forEach((oneHuro)=>{
          if(oneHuro.oneMentsu[0]===oneHuro.oneMentsu[1]){//副露が刻子または槓子のどちらか
            huroKotsuMentsuList.push(oneHuro.oneMentsu);
            if(yaochu.some((x)=>x===oneHuro.oneMentsu[0])){//副露が么九牌か
              if(oneHuro.oneMentsu.length===4){//副露が槓子か
                hu += 16;//么九牌の明槓
              }else{
                hu += 4;//么九牌の明刻
              }
            }else{
              if(oneHuro.oneMentsu.length===4){
                hu += 8;//中張牌の明槓
              }else{
                hu += 2;//中張牌の明刻                
              }
            }
          }
        })
        for(let j=1; j<5; j++){
          if(mentsu[j][0]===mentsu[j][1]){//刻子か槓子
            if(!this.isEqualOneOfThem(mentsu[j],huroMentsu)){//副露じゃない
              if(yaochu.some((x)=>x===mentsu[j][0])){//么九牌か中張牌か
                if(mentsu[j].length===4){//槓子か
                  hu += 32;//么九牌の暗槓
                }else{
                  hu += 8;//么九牌の暗刻
                }
              }else{
                if(mentsu[j].length===4){
                  hu += 16;//中張牌の暗槓
                }else{
                  hu += 4;//中張牌の暗刻                
                }
              }
            }
          }
        }
        const machiMentsuOneDigitString = mentsu[machi].map((x)=>x%10).toString();
        if(mentsu[machi].length===2){
          hu += 2;//単騎待ち
        }else if(mentsu[machi][0]!==mentsu[machi][1]){//和了が順子
          if(mentsu[machi][1]===this.state.agarihai.hai){
            hu+=2;//嵌張待ち
          }else if((machiMentsuOneDigitString===[1,2,3].toString && this.state.agarihai.hai%10===3)
          ||(machiMentsuOneDigitString===[7,8,9].toString && this.state.agarihai.hai%10===7)){
            hu += 2;//辺張待ち
          }
        }
        //符の切り上げ処理
        const forCeil = 10;
        hu = Math.ceil(hu / forCeil)*10;
        if(hu===20){
          hu=30;//平和以外で20符になるのは喰い平和のみだが、例外敵に30符として扱う。
        }

        huList.push(hu);
      }
    }
    return huList;
  }

  //複数の飜数・役とそれに対応する複数の符から、もっとも高い得点および得点移動を計算する。
  getResult(hansuYakuList, huList){
    let latestResult = {hansu:0,hu:0,point:0,pointMoving:[0,0,0,0]}; 
    let latestYakuList = [];
    //和了牌が誰から出たか、インデックスを作成。
    let agarihaiIeIndex;
    if(this.state.agarihai.ie==="ji"){
      agarihaiIeIndex = 0;//ツモ
    }else if(this.state.agarihai.ie==="shimo"){//下家
      agarihaiIeIndex = 1;
    }else if(this.state.agarihai.ie==="toi"){//対面
      agarihaiIeIndex = 2;
    }else{//上家
      agarihaiIeIndex = 3;
    }
    //自風から親のインデックスを下記の通り作成する。
    // 31(東)=>0(自家)    // 32(南)=>3(下家)    // 33(西)=>2(対面)    // 34(北)=>1(上家)
    const oyaIndex = (4 - this.state.jiKaze % 31) % 4;//

    for(let i=0; i<huList.length; i++){
      const hu = huList[i];
      const hansu = hansuYakuList[i].hansu;
      let result = {hansu:hansu,hu:hu,point:0,pointMoving:[0,0,0,0]};      
      if(this.state.jiKaze===31){//親の場合
        if(hansu>=13){
          result.point = 48000 * (hansu / 13);
        }else if(hansu>=11){
          result.point = 36000;
        }else if(hansu>=8){
          result.point = 24000;  
        }else if(hansu>=6){
          result.point = 18000;
        }else if(hansu===5){
          result.point = 12000;
        }else{//4飜以下の場合
          const basePoint = hu * Math.pow(2,hansu+2);//基本点
          if(basePoint>=2000){//4飜以下の満貫
            result.point = 12000;
          }else if(agarihaiIeIndex===0){//満貫未満のツモ和了
            const haraiAll = Math.ceil(basePoint*2 / 100) * 100;//全員一律の払い(100点未満は切り上げる)
            result.point = haraiAll*3;
            result.pointMoving = [result.point, -haraiAll, -haraiAll, -haraiAll];
          }else{//満貫未満のロン和了
            const haraiRon = Math.ceil(basePoint*6 / 100) * 100;//100点未満は切り上げる
            result.point = haraiRon;
            result.pointMoving[0] = haraiRon;
            result.pointMoving[agarihaiIeIndex] = -haraiRon;
          }
        }
        if(result.point>=12000){//満貫以上の場合の計算
          if(agarihaiIeIndex===0){//親のツモ上がり
            const haraiAll = result.point / 3;//全員一律の払い(100点未満は切り上げる)
            result.pointMoving = [result.point, -haraiAll, -haraiAll, -haraiAll];
          }else{//親のロン上がり
            result.pointMoving[0]=result.point;
            result.pointMoving[agarihaiIeIndex] = -result.point;
          }
        }
      }else{//子の場合
        if(hansu>=13){
          result.point = 32000 * (hansu / 13);
        }else if(hansu>=11){
          result.point = 24000;
        }else if(hansu>=8){
          result.point = 26000;  
        }else if(hansu>=6){
          result.point = 12000;
        }else if(hansu===5){
          result.point = 8000;
        }else{//4飜以下の場合
          const basePoint = hu * Math.pow(2, hansu+2);//基本点
          if(basePoint>=2000){//4飜以下の満貫
            result.point = 8000;
          }else if(agarihaiIeIndex===0){//満貫未満のツモ和了
            const haraiKo = Math.ceil(basePoint / 100) * 100;//子の払い(100点未満は切り上げる)
            const haraiOya = Math.ceil(basePoint * 2 / 100) * 100;//親の払い(100点未満は切り上げる)
            result.point = (haraiKo * 2) + haraiOya;
            result.pointMoving = [result.point, -haraiKo, -haraiKo, -haraiKo];
            result.pointMoving[oyaIndex] = -haraiOya;
          }else{//満貫未満のロン和了
            const haraiRon = Math.ceil(basePoint*4 / 100) * 100;//100点未満は切り上げる
            result.point = haraiRon;
            result.pointMoving[0] = haraiRon;
            result.pointMoving[agarihaiIeIndex] = -haraiRon;
          }
        }
        if(result.point>=8000){//満貫以上の場合の計算
          if(agarihaiIeIndex===0){//子のツモ上がり
            const haraiKo = result.point / 4;//子の払い(100点未満は切り上げる)
            const haraiOya = result.point / 2;//親の払い(100点未満は切り上げる)
            result.pointMoving = [result.point,-haraiKo,-haraiKo,-haraiKo];
            result.pointMoving[oyaIndex] = -haraiOya;
          }else{//子のロン上がり
            result.pointMoving[0] = result.point;
            result.pointMoving[agarihaiIeIndex] = -result.point;
          }
        }
      }
      if(latestResult.point < result.point){
        Object.assign(latestResult,result);
        latestYakuList = Array.from(hansuYakuList[i].yakuList);
      }
    }
    return [latestResult,latestYakuList];
  }

  //二次元配列の中に特定の1次元配列が存在しているかを確認する。
  //配列と配列の比較では文字列に置き換えて比較する必要がある
  isArray2DInArray(array2D,specifiedArray){
    const stringArray2D = array2D.map((x)=>x.toString());
    return stringArray2D.some((x)=>x===specifiedArray.toString());
  }

  //二次元配列２つを比較してイコールかどうかを返す。
  isArray2DEqualDeepToString(array2D1,array2D2){
    const stringArray2D1 = array2D1.map((x)=>x.toString());
    const stringArray2D2 = array2D2.map((x)=>x.toString());
    return stringArray2D1.toString() === stringArray2D2.toString();
  }

  //純全帯么九なら1、混全帯么九なら2を返す関数
  isJunchanChanta(mentsu){
    let junchanChantaNum = 1;
    for(let i=0; i<5 ; i++){
      if(i===0){//mentsu[0]は雀頭なので別処理
        if(!this.isEqualOneOfThem(mentsu[i],[[1,1],[9,9],[11,11],[19,19],[21,21],[29,29]])){
          junchanChantaNum = 2;//雀頭が1,9じゃなければ、純全帯么九の可能性なし。
        }
        if(junchanChantaNum===2 && !this.isEqualOneOfThem(mentsu[i],[[31,31],[32,32],[33,33],[34,34],[35,35],[36,36],[37,37]])){
          junchanChantaNum = 0;
          return junchanChantaNum;//雀頭が(1,9じゃない)&&(字牌じゃない) なら純全帯么九でも混全帯么九でもない。
        }
      }else{
        if(!(mentsu[i][0]===1 || mentsu[i][2]===9
          ||mentsu[i][0]===11 || mentsu[i][2]===19
          ||mentsu[i][0]===21 || mentsu[i][2]===29)){
            junchanChantaNum = 2;//1,9の刻子、最初が1または最後が9の順子のいずれでもなければ純全帯么九の可能性なし
        }
        if(!(mentsu[i][0]===1 || mentsu[i][2]===9
          ||mentsu[i][0]===11 || mentsu[i][2]===19
          ||mentsu[i][0]===21 || mentsu[i][2]===29
          ||mentsu[i][0]===31 || mentsu[i][0]===32
          ||mentsu[i][0]===33 || mentsu[i][0]===34
          ||mentsu[i][0]===35 || mentsu[i][0]===36 || mentsu[i][0]===37)){
            junchanChantaNum = 0;//1,9の刻子、最初が1または最後が9の順子、字牌の刻子でなければ純全帯么九でも混全帯么九でもない
            return junchanChantaNum;
        }
      }
    }
    return junchanChantaNum;
  }

  //ある１つの面子が、指定された複数の面子に存在するか。
  isEqualOneOfThem(oneMentsu,specifiedMentsuList){
    for(let i=0;i<specifiedMentsuList.length;i++){
      if(oneMentsu.toString() === specifiedMentsuList[i].toString()) return true;
    }
    return false;
  }

  //指定された牌が指定された枚数以上含んでいるか。
  isIncludeOver(mentsuFlatList,specifiedHaiList,specifiedHaiNumList){
    for(let i=0; i<specifiedHaiList.length; i++){
      if(mentsuFlatList.filter(x=>x===specifiedHaiList[i]).length < specifiedHaiNumList[i]){
        return false;
      }
    }
    return true;
  }

  //指定された牌のみで構成されているか。
  //forEachで回すと途中でreturnしようとしても全ての要素に対して実行が終了するまで続いてしまうので注意
  isOnly(mentsuFlatList,specifiedHaiList){
    for(let i=0;i<mentsuFlatList.length;i++){
      if(specifiedHaiList.indexOf(mentsuFlatList[i])===-1) {
        return false;
      }
    }
    return true;
  }

  selectKaze = (jiBa,selectedKaze) =>{
    if(jiBa===0){
      this.setState({
        jiKaze:selectedKaze,
      });
    }else{
      this.setState({
        baKaze:selectedKaze,
      })
    }
  }

  selectRichi = ()=>{

  }

  setCanKuitan = (oldCanKuitanState)=>{
    const newCanKuitanState = !oldCanKuitanState;
    this.setState({
      canKuitan:newCanKuitanState,
    })
  }

  setChankan = (oldChankanState)=>{
    const newChankanState = !oldChankanState;
    this.setState({
      chankan:newChankanState,
    })
  }

  setRinshan = (oldRinshanState)=>{
    const newRinshanState = !oldRinshanState;
    this.setState({
      rinshan:newRinshanState,
    })
  }

  setIppatsu = (oldIppatsuState)=>{
    const newIppatsuState = !oldIppatsuState;
    this.setState({
      ippatsu:newIppatsuState,
    })
  }

  setHaitei = (haitei) =>{
    let newHaitei = haitei;
    if(haitei === this.state.haitei){
      newHaitei = 0;
    }
    this.setState({
      haitei:newHaitei,
    })
  }

  setTenho = (tenho) =>{
    let newTenho = tenho;
    if(tenho===this.state.tenho){
      newTenho=0;
    }
    this.setState({
      tenho:newTenho,
    })
  }

  setRichi = (richi) =>{
    let newRichi = richi;
    if(richi===this.state.richi){
      newRichi = 0;
    }
    this.setState({
      richi:newRichi,
    })
  }

  setAgarihaiCha = (agarihaiCha) =>{
    let newAgarihai = {...this.state.agarihai}
    newAgarihai["ie"] = agarihaiCha
    this.setState({
      agarihai:newAgarihai,
    })
  }

  setAgarihaiHai = (agarihaiHai,index) =>{
    let newAgarihai = {...this.state.agarihai}
    newAgarihai["hai"] = agarihaiHai
    this.setState({
      agarihai:newAgarihai,
    })
  }

  addTehai = (hai,index) =>{
    let newTehai = Array.from(this.state.tehai);
    newTehai.push(hai);
    this.setState({
      tehai:newTehai,
    })
  }

  removeTehai = (hai,index) =>{
    let newTehai = Array.from(this.state.tehai);
    newTehai.splice(index,1);
    this.setState({
      tehai:newTehai,
    })
  }

  addDora = (hai,index) =>{
    let newDora = Array.from(this.state.dora);
    newDora.push(hai);
    if(this.state.dora.includes(0)){
      newDora.splice(newDora.indexOf(0),1);
    }
    this.setState({
      dora:newDora,
    })
  }

  removeDora = (hai,index) =>{
    let newDora = Array.from(this.state.dora);
    newDora.splice(index,1);
    if(newDora.length === 0){
      newDora.push(0);
    }
    this.setState({
      dora:newDora,
    })
  }

  addUradora = (hai,index) =>{
    let newUradora = Array.from(this.state.uradora);
    newUradora.push(hai);
    if(this.state.uradora.includes(0)){
      newUradora.splice(newUradora.indexOf(0),1);
    }
    this.setState({
      uradora:newUradora,
    })
  }

  removeUradora = (hai,index) =>{
    let newUradora = Array.from(this.state.uradora);
    newUradora.splice(index,1);
    if(newUradora.length === 0){
      newUradora.push(0);
    }
    this.setState({
      uradora:newUradora,
    })
  }

  resetTehai = () =>{
    this.setState({

    })
  }

  addAnkan = (hai,index) =>{
    let newAnkan = Array.from(this.state.ankan);
    newAnkan.push(hai);
    this.setState({
      ankan:newAnkan,
    })
  }

  removeAnkan = (hai,index)=>{
    let newAnkan = Array.from(this.state.ankan);
    newAnkan.splice(index,1);
    this.setState({
      ankan:newAnkan,
    })
  }

  addHuro = (huroObj,index) =>{
    let newHuro = Array.from(this.state.huro);
    newHuro.push(huroObj);
    this.setState({
      huro:newHuro,
    })
  }

  removeHuro = (huroObj,index) =>{
    let newHuro = Array.from(this.state.huro);
    newHuro.splice(index,1);
    this.setState({
      huro:newHuro,
    })
  }

  resetHai = (x)=>{
    this.setState({
      tehai:[],//和了時の手牌（副露牌除く）
      agarihai:{hai:0, ie:"ji"},//上がり牌とどこから持ってきたか
      huro:[],//副露牌オブジェクトの配列
      ankan:[],//暗槓の牌リスト(tehaiには含めずこちらにのみ表記)
      baKaze:31,//場風
      jiKaze:31,//自風
      richiBo:0,//リーチ棒の点数合計
      kyotakuBo:0,//供託棒の点数合計
      dora:[0],//ドラ牌(表示牌ではなくそのもの)
      uradora:[0],//裏ドラ牌(表示牌ではなくそのもの)
      akadora:0,//赤ドラ枚数
      richi:0,// 1: 立直, 2: ダブル立直、３オープンリーチ
      ippatsu:false,//一発
      chankan:false,//槍槓
      rinshan:false,//嶺上開花
      haitei:0,// 1: 海底摸月, 2: 河底撈魚
      tenho:0,//  1: 天和, 2: 地和
      canKuitan:false,//喰タンOK？
      result:{},//飜数、符、点、点数移動が表示される。hansu:,hu:,point:,pointMoving:[0:,1:,2:,3:]
      yaku:[],//役の一覧を文字列で格納した配列
    })
  }

  render(){
    const allHaiList = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37];
    return (
      <div>
        <div className="appBodyWrapper">
          <h1>麻雀得点自動計算</h1>
            麻雀の得点計算のページです。必要情報を設定すると自動で得点が算出されます。<br/>
            現在の設定を全てリセットするには、画面右下の「RESET」を押下してください。<br/>
            「計算結果の確認」「選択牌の削除」を行うには、画面右下の「SHOW RESULT」を押下してください。
          <h2>設定画面</h2>
          <h3>対局設定</h3>
          <ToggleButtonComponent select={this.setCanKuitan} changeItem={this.state.canKuitan} label={"喰いたん可/不可"}/>
          <KazeList select={this.selectKaze} jiKaze={this.state.jiKaze} baKaze={this.state.baKaze}/>
          <br/>
          <h3>状況役設定</h3>
          <HaiteiList select={this.setHaitei} haitei={this.state.haitei}/>
          <TenhoList select={this.setTenho} tenho={this.state.tenho}/>
          <RichiList select={this.setRichi} richi={this.state.richi}/>
          <AgarihaiChaList select={this.setAgarihaiCha} agarihaiCha={this.state.agarihai.ie}/>
          <div className="flexWrap">
            <div className='flexItem'>
            <ToggleButtonComponent className='flexItem' select={this.setChankan} changeItem={this.state.chankan} label={"槍槓"}/>
            </div>
            <div className='flexItem'>
            <ToggleButtonComponent className='flexItem' select={this.setRinshan} changeItem={this.state.rinshan} label={"嶺上開花"}/>
            </div>
            <div className='flexItem'>
            <ToggleButtonComponent className='flexItem' select={this.setIppatsu} changeItem={this.state.ippatsu} label={"一発"}/>
            </div>
          </div>
          <br/>
          <h3>牌設定</h3>
          <div className="haiSelectTabsWrap">
            <HaiSelectTabs
              addTehai = {this.addTehai}
              addAnkan = {this.addAnkan}
              addHuro = {this.addHuro}
              addAgarihai = {this.setAgarihaiHai}
              addDora = {this.addDora}
              addUradora = {this.addUradora}
              haiList = {allHaiList}
            />
          </div>
          <br/>
          <h2>状況確認用画面</h2>
          {/*手牌の牌リスト*/}
          手牌（和了牌：{haiNumSets[this.state.agarihai.hai]}）：<HaiList select={this.removeTehai} haiList={this.state.tehai} />
          {/*暗槓の牌リスト */}
          暗槓：<AnkanList select={this.removeAnkan} haiList={this.state.ankan} />
          {/**副露の牌リスト */}
          副露：<HuroHaiList select={this.removeHuro} huro={this.state.huro} />        
          {/*ドラリスト*/}
          ドラ：<HaiList select={this.removeDora} haiList={this.state.dora} />
          {/*裏ドラリスト*/}
          裏ドラ：<HaiList select={this.removeUradora} haiList={this.state.uradora} />

          <ResultWindow
            yaku={this.state.yaku}
            dorahai={this.state.dora}
            uradorahai={this.state.uradora}
            agarihai={this.state.agarihai} 
            jiKaze={this.state.jiKaze}
            baKaze={this.state.baKaze}
            result={this.state.result}
            selectTehai={this.removeTehai}
            haiListTehai={this.state.tehai}
            selectAnkan={this.removeAnkan}
            haiListAnkan={this.state.ankan}
            selectHuro={this.removeHuro}
            haiListHuro={this.state.huro}
          />
        </div>
        <div className="resetButton">
        <SelectButtonsComponent label={"RESET"} color={"default"} setNum={0} select={this.resetHai} />
        </div>
        {/*
        リセットボタン
        readmeを書く
        */}
      </div>
    );
  }
}

export default App;
