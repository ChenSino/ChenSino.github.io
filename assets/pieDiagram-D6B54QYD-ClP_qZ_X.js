import{c as V}from"./chunk-4KE642ED-BDwjWOm6.js";import{p as G}from"./gitGraph-WSSBKK6M-L23UEOVH-CLwu7Ysn.js";import{p as K,m as r,S as X,t as y,aP as Y,H as j,k as q,aN as I,aQ as J,aR as M,aS as U,T as Z,a as _,b as ee,v as te,w as ae,B as ie,F as re}from"./mermaid.esm.min-hKTjMkIP.js";import"./chunk-5ZJXQJOJ-B163gwOZ.js";import"./app-BOrC0jFr.js";var O=K.pie,T={sections:new Map,showData:!1,config:O},u=T.sections,D=T.showData,le=structuredClone(O),se=r(()=>structuredClone(le),"getConfig"),oe=r(()=>{u=new Map,D=T.showData,X()},"clear"),ne=r(({label:e,value:a})=>{u.has(e)||(u.set(e,a),y.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),pe=r(()=>u,"getSections"),de=r(e=>{D=e},"setShowData"),ce=r(()=>D,"getShowData"),B={getConfig:se,clear:oe,setDiagramTitle:_,getDiagramTitle:ee,setAccTitle:te,getAccTitle:ae,setAccDescription:ie,getAccDescription:re,addSection:ne,getSections:pe,setShowData:de,getShowData:ce},fe=r((e,a)=>{V(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ge={parse:r(async e=>{let a=await G("pie",e);y.debug(a),fe(a,B)},"parse")},me=r(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ue=me,he=r(e=>{let a=[...e.entries()].map(l=>({label:l[0],value:l[1]})).sort((l,h)=>h.value-l.value);return Y().value(l=>l.value)(a)},"createPieArcs"),Se=r((e,a,l,h)=>{y.debug(`rendering pie chart
`+e);let d=h.db,v=j(),C=q(d.getConfig(),v.pie),b=40,s=18,c=4,o=450,S=o,x=I(a),n=x.append("g");n.attr("transform","translate("+S/2+","+o/2+")");let{themeVariables:i}=v,[k]=J(i.pieOuterStrokeWidth);k??(k=2);let A=C.textPosition,f=Math.min(S,o)/2-b,L=M().innerRadius(0).outerRadius(f),P=M().innerRadius(f*A).outerRadius(f*A);n.append("circle").attr("cx",0).attr("cy",0).attr("r",f+k/2).attr("class","pieOuterCircle");let R=d.getSections(),w=he(R),W=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12],p=U(W);n.selectAll("mySlices").data(w).enter().append("path").attr("d",L).attr("fill",t=>p(t.data.label)).attr("class","pieCircle");let z=0;R.forEach(t=>{z+=t}),n.selectAll("mySlices").data(w).enter().append("text").text(t=>(t.data.value/z*100).toFixed(0)+"%").attr("transform",t=>"translate("+P.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),n.append("text").text(d.getDiagramTitle()).attr("x",0).attr("y",-(o-50)/2).attr("class","pieTitleText");let $=n.selectAll(".legend").data(p.domain()).enter().append("g").attr("class","legend").attr("transform",(t,g)=>{let m=s+c,H=m*p.domain().length/2,N=12*s,Q=g*m-H;return"translate("+N+","+Q+")"});$.append("rect").attr("width",s).attr("height",s).style("fill",p).style("stroke",p),$.data(w).append("text").attr("x",s+c).attr("y",s-c).text(t=>{let{label:g,value:m}=t.data;return d.getShowData()?`${g} [${m}]`:g});let E=Math.max(...$.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),F=S+b+s+c+E;x.attr("viewBox",`0 0 ${F} ${o}`),Z(x,o,F,C.useMaxWidth)},"draw"),xe={draw:Se},ve={parser:ge,db:B,renderer:xe,styles:ue};export{ve as diagram};
