/* Get Format */ 
function $(obj){
    obj = document.querySelector(obj);
    return obj;
}
/* Get Format /*/


function loadScript(scriptTag){
    var arr = document.getElementsByClassName(scriptTag);
    for (var n = 0; n < arr.length; n++)
        eval(arr[n].innerHTML);
}

let closeBtn = $('.close');
let wrap = $('.wrap');
let wrapContent = $('.wrap-content');
let sombra = $('.sombra');
let loading = $('#loading');

document.onload = call();

function call(){
    fecharWrap();
}

function setResponse(){
    wrapContent.innerHTML = ajax.response;
    loading.style.display = 'none';
}

function fecharWrap(){
    closeBtn.onclick = () => {
        wrap.style.display = 'none';
        wrapContent.innerHTML = '';
        sombra.style.display = 'none';
    } 
}

function abrirWrap(){
    wrapContent.innerHTML = '';
    wrap.style.display = 'block';
    sombra.style.display = 'block'; 
}

function buscarCompras(document){
    return new Promise(function(resolve){
        ajax1 = new XMLHttpRequest
        ajax1.open('GET',`./source/compras.php?document=${document}`)
        ajax1.onloadend = () => { 
            resposta = JSON.parse(ajax1.response)
            resolve(resposta)
            loading.style.display = 'none';
 
        }
        ajax1.send()
    })
}

function buscarTemplate(ordem){
    loading.style.display = 'block';
        ajax = new XMLHttpRequest;
        ajax.open('GET', './services/produto.html');
        ajax.onloadend = () => {
            wrapContent.innerHTML = ajax.response;
            loading.style.display = 'none';
            buscarOrdem(getDoc(), ordem);
            loadScript('scriptOrdem')
        }
        ajax.send();
}

function buscarOrdem(document, order){
    ajax = new XMLHttpRequest;
    ajax.open('GET','./source/order.php?document='+document+'&order='+order)
    ajax.onloadend = () => {
        jsonOrdem = JSON.parse(ajax.response)
        inserirCompras()
    }
    ajax.send()
}

function inserirCompras(){
    if(jsonOrdem[0].v1 >= 1){
        v1 = jsonOrdem[0].v1+'x '+jsonOrdem[0].var1_name;
    }else{
        v1 = '';
    }
    if(jsonOrdem[0].v2 >= 1){
        v2 = jsonOrdem[0].v2+'x '+jsonOrdem[0].var2_name;
    }else{
        v2 = '';
    }
    if(jsonOrdem[0].v3 >= 1){
        v3 = jsonOrdem[0].v3+'x '+jsonOrdem[0].var3_name;
    }else{
        v3 = '';
    }
    if(jsonOrdem[0].v4 >= 1){
        v4 = jsonOrdem[0].v4+'x '+jsonOrdem[0].var4_name;
    }else{
        v4 = '';
    }
    if(jsonOrdem[0].v5 >= 1){
        v5 = jsonOrdem[0].v5+'x '+jsonOrdem[0].var5_name;
    }else{
        v5 = '';
    }
    result = v1+' '+v2+' '+v3+' '+v4+' '+v5;
    total = parseInt(jsonOrdem[0].v1)+parseInt(jsonOrdem[0].v2)+parseInt(jsonOrdem[0].v3)+parseInt(jsonOrdem[0].v4)+parseInt(jsonOrdem[0].v5);
    if(jsonOrdem[0].method == 'ticket'){
        metodo = 'boleto'
    }else{
        metodo = 'Cartão de Crédito'
    }
    if(jsonOrdem[0].payment_status == 'pending_waiting_payment'){
        payStatus = 'Aguardando Pagamento'
    }else if(jsonOrdem[0].payment_status == 'accredited'){
        payStatus = 'Aprovado'
    }else{
        payStatus = 'Aguardando Aprovação'
    }
    $('#i1').innerHTML = jsonOrdem[0].shipping_code;
    $('#i2').innerHTML = jsonOrdem[0].shipping_status;
    $('#i3').innerHTML = jsonOrdem[0].product_name+'™';
    $('#i4').innerHTML = jsonOrdem[0].order;
    $('#i5').innerHTML = jsonOrdem[0].date;
    $('#i6').innerHTML = result;
    $('#i7').innerHTML = total+' unidade(s)';
    $('#i8').innerHTML = jsonOrdem[0].payment_id;
    $('#i9').innerHTML = jsonOrdem[0].value;
    $('#i10').innerHTML = metodo;
    $('#i11').innerHTML = jsonOrdem[0].installments+'x';
    $('#i12').innerHTML = payStatus;
    $('#i-1').innerHTML = jsonOrdem[0].shipping_code;
    $('#i-3-7').innerHTML = 'Produto: '+jsonOrdem[0].product_name+'™ | Ordem: '+jsonOrdem[0].order+' | Data da Compra: '+jsonOrdem[0].date+' | Unidades: '+result+' | Total: '+total+' unidade(s)';
    $('#i-8-12').innerHTML = 'ID do Pagamento: '+jsonOrdem[0].payment_id+' | Valor Pago: '+jsonOrdem[0].value+' | Método de Pagamento: '+metodo+' | Parcelas: '+jsonOrdem[0].installments+'x | Status do Pagamento: '+payStatus;
}

$('#rastreio').onclick = () => {
    abrirWrap();
    wrapContent.innerHTML = '<iframe src="https://www2.correios.com.br/sistemas/rastreamento/default.cfm" title="Rastreamento Correios" width="100%" height="98%"></iframe>';
    loading.style.display = 'none';
}

$('#rastreioSB').onclick = () => {
    abrirWrap();
    wrapContent.innerHTML = '<iframe src="https://www2.correios.com.br/sistemas/rastreamento/default.cfm" title="Rastreamento Correios" width="100%" height="98%"></iframe>';
    loading.style.display = 'none';
}

$('#outro').onclick = () => {
    abrirWrap();
    ajax = new XMLHttpRequest;
    ajax.open('GET','./services/outro.html');
    ajax.onloadend = () => {
        setResponse()
        loadScript('scriptOutro')
    }
    ajax.send();
}

$('#compras').onclick = () => {
    abrirWrap();
    wrapContent.innerHTML = '<div class="option-title inblock fullwid"><div class="tab middle center"><h2>Clique no produto para ver todas as informações</h2></div></div>';
    buscarCompras(getDoc())
    .then(function(compras){
        ordem1 = '<div class="ordem inblock halfwid"><div '+compras[0].order+' class="tab middle center getOrder"><h3>Pedido '+compras[0].order+'</h3><p style="text-transform: capitalize">'+compras[0].product_name+'™</p><img src="'+compras[0].promotional_img+'" alt="" srcset=""></div></div>';
        currentContent1 = wrapContent.innerHTML;
        wrapContent.innerHTML = currentContent1+ordem1;
        for(i=0; i<compras.length; i++){
            ordem = '<div class="ordem inblock halfwid"><div '+compras[i].order+' class="tab middle center getOrder"><h3>Pedido '+compras[i].order+'</h3><p style="text-transform: capitalize">'+compras[i].product_name+'™</p><img src="'+compras[i].promotional_img+'" alt="" srcset=""></div></div>';
            currentContent = wrapContent.innerHTML;
            wrapContent.innerHTML = currentContent+ordem;
        }
        let script = '<script class="scriptProduto">let getOrder = document.getElementsByClassName("getOrder");for (i = 0; i < getOrder.length; i++){getOrder[i].addEventListener("click", function(){buscarTemplate(this.getAttributeNames()[0])})}</script>';
        wrapContent.innerHTML = currentContent+'<div class="space"></div>'+script;
        loadScript('scriptProduto')
    })
}

$('#comprasSB').onclick = () => {
    abrirWrap();
    wrapContent.innerHTML = '<div class="option-title inblock fullwid"><div class="tab middle center"><h2>Clique no produto para ver todas as informações</h2></div></div>';
    buscarCompras(getDoc())
    .then(function(compras){
        ordem1 = '<div class="ordem inblock halfwid"><div '+compras[0].order+' class="tab middle center getOrder"><h3>Pedido '+compras[0].order+'</h3><p style="text-transform: capitalize">'+compras[0].product_name+'™</p><img src="'+compras[0].promotional_img+'" alt="" srcset=""></div></div>';
        currentContent1 = wrapContent.innerHTML;
        wrapContent.innerHTML = currentContent1+ordem1;
        for(i=0; i<compras.length; i++){
            ordem = '<div class="ordem inblock halfwid"><div '+compras[i].order+' class="tab middle center getOrder"><h3>Pedido '+compras[i].order+'</h3><p style="text-transform: capitalize">'+compras[i].product_name+'™</p><img src="'+compras[i].promotional_img+'" alt="" srcset=""></div></div>';
            currentContent = wrapContent.innerHTML;
            wrapContent.innerHTML = currentContent+ordem;
        }
        let script = '<script class="scriptProduto">let getOrder = document.getElementsByClassName("getOrder");for (i = 0; i < getOrder.length; i++){getOrder[i].addEventListener("click", function(){buscarTemplate(this.getAttributeNames()[0])})}</script>';
        wrapContent.innerHTML = currentContent+'<div class="space"></div>'+script;
        loadScript('scriptProduto')
    })
}

$('#atendimento').onclick = () => {
    abrirWrap();   
    ajax = new XMLHttpRequest;
    ajax.open('GET','./services/atendimento.html');
    ajax.onloadend = () => {
        setResponse()
        loadScript('scriptAtendimento')
    }
    ajax.send();
}

$('#atendimentoSB').onclick = () => {
    abrirWrap();   
    ajax = new XMLHttpRequest;
    ajax.open('GET','./services/atendimento.html');
    ajax.onloadend = () => {
        setResponse()
        loadScript('scriptAtendimento')
    }
    ajax.send();
}

$('#trocasSB').onclick = () => {
    ajax = new XMLHttpRequest;
    ajax.open('GET','./services/callback.html')
    ajax.onloadend = () => {
        abrirWrap()
        setResponse()
        loadScript('callbackScript')
    }
    ajax.send()
}

$('#desistenciasSB').onclick = () => {
    ajax = new XMLHttpRequest;
    ajax.open('GET','./services/callback.html')
    ajax.onloadend = () => {
        abrirWrap()
        setResponse()
        loadScript('callbackScript')
    }
    ajax.send()
}

function limparSessao(tempo){
    setTimeout(() => {
        sessionStorage.clear()
        getDoc()
    }, tempo);
}

function getDoc(){
    let login = sessionStorage.getItem('session')
    if(login && login.length == 11){
        limparSessao(300000)
        $('.login').style.display = 'none';
        return login
    }else{
        window.location = 'https://deatly.com/login'
    }
}

window.onload = () => {
    getDoc()
}

$('#exit').onclick = () => {
    limparSessao(0)
}