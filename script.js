const WHATSAPP_PHONE='5573999184458';

const burgers=[
 {n:'Xerife',p:42.90,c:59.90,img:'xerife.jpg',d:'Pão de brioche · hambúrguer artesanal de picanha · mussarela · maionese · alface americano · picles · tomate · cebola roxa'},
 {n:'Rodeio Ring',p:36.90,c:54.90,img:'rodeio-ring.jpg',d:'Pão de brioche · rúcula · hambúrguer artesanal 120g · molho especial de limão e alho · onion rings · barbecue'},
 {n:'Vaqueira',p:29.90,c:48.90,img:'vaqueira.jpg',d:'Pão de brioche · hambúrguer artesanal 100g · maionese da casa · alface e tomate · bacon · queijo'},
 {n:'Faroeste',p:29.90,c:48.90,img:'faroeste.jpg',d:'Pão de brioche · hambúrguer artesanal 100g · maionese · calabresa acebolada · queijo · alface e tomate'},
 {n:'Touro Negro',p:36.90,c:54.90,img:'touro-negro.jpg',d:'Pão australiano · hambúrguer artesanal 150g · rúcula · cebola caramelizada · cheddar da casa · barbecue'},
 {n:'Bala no Alvo',p:21.90,c:37.90,img:'bala-no-alvo.jpg',d:'Pão de brioche · hambúrguer artesanal 80g · queijo · alface · tomate · maionese'},
 {n:'Dallas',p:28.90,c:46.90,img:'dallas.jpg',d:'Pão de brioche · hambúrguer artesanal 100g · maionese · queijo gratinado · cheddar · calabresa moída'},
 {n:'Cowboy Burguer',p:38.90,c:56.90,img:'cowboy-burguer.jpg',d:'Pão de brioche · hambúrguer artesanal 120g · maionese · ovo · alface · tomate · queijo · calabresa acebolada · cheddar · bacon'},
 {n:'Touro Furioso',p:46.90,c:64.90,img:'touro-furioso.jpg',d:'Pão de brioche · 2 hambúrgueres artesanais de 100g · maionese · duplo cheddar · bacon · alho frito · tomate · alface · molho apimentado'},
 {n:'Velho Oeste',p:27.90,c:45.90,img:'velho-oeste.jpg',d:'Pão australiano · hambúrguer de frango empanado · alface crocante · molho branco de queijos'}
];
const portions=[
 ['Onion Rings 200g',16],['Onion Rings 350g',22],
 ['Batata Frita 200g',16],['Batata Frita 300g',21],['Batata Frita 500g',32.90],
 ['Batata Frita Recheada 200g',19],['Batata Frita Recheada 350g',23],
 ['Batata Frita Suprema 400g',39.90]
];
const addons=[
 ['Carne 100g',8],['Carne 120g',9],['Bacon',5],['Queijo',3.5],
 ['Alface ou Tomate',2],['Calabresa',4.5],['Cebola',3],['Cebola caramelizada',6],
 ['Molho Cheddar',4.5],['Molho de queijos branco',5],['Ovo',3],
 ['Maionese da Casa',5],['Maionese tradicional',2.5],['Ketchup',2],['Mostarda',2],['Barbecue',3]
];
let cart=[];

const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function render(){
 document.getElementById('burgers').innerHTML=burgers.map((x,i)=>`
 <article class="product">
  <img class="product-photo" src="${x.img}" alt="${esc(x.n)} da Karmel Burger" loading="lazy">
  <div class="product-body">
   <h3>${esc(x.n)}</h3><p class="product-desc">${esc(x.d)}</p>
   <div class="buy-row">
    <div class="prices"><strong>${money(x.p)}</strong><span>Combo ${money(x.c)}</span></div>
    <div class="product-actions">
      <button class="add-single" onclick="addItem('${esc(x.n)}',${x.p})">Burger</button>
      <button class="add-combo" onclick="addItem('Combo ${esc(x.n)}',${x.c})">Combo</button>
    </div>
   </div>
  </div>
 </article>`).join('');

 document.getElementById('portions').innerHTML=portions.map(x=>`
 <div class="simple-item"><span>${esc(x[0])}</span><strong>${money(x[1])}</strong><button onclick="addItem('${esc(x[0])}',${x[1]})">Adicionar</button></div>`).join('');

 document.getElementById('addons').innerHTML=addons.map(x=>`
 <div class="addon"><span>${esc(x[0])}</span><button onclick="addItem('${esc(x[0])}',${x[1]})">${money(x[1])} +</button></div>`).join('');
 renderCart();
}
function addItem(name,price){
 cart.push({name,price});
 renderCart();
 showToast(`${name} adicionado ao pedido`);
}
function removeItem(i){cart.splice(i,1);renderCart();}
function renderCart(){
 const box=document.getElementById('cart');
 document.getElementById('cartCount').textContent=cart.length;
 if(!cart.length){
   box.className='empty';
   box.innerHTML='Seu carrinho está vazio.<br>Escolha os itens acima para começar.';
   document.getElementById('total').textContent=money(0);
   return;
 }
 box.className='';
 box.innerHTML=cart.map((x,i)=>`
  <div class="cart-item"><span>${esc(x.name)}</span><strong>${money(x.price)}</strong><button onclick="removeItem(${i})">×</button></div>
 `).join('');
 document.getElementById('total').textContent=money(cart.reduce((s,x)=>s+x.price,0));
}
function showToast(text){
 const t=document.getElementById('toast');t.textContent=text;t.classList.add('show');
 clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),1800);
}
document.getElementById('type').addEventListener('change',()=>{
 const delivery=document.getElementById('type').value==='Entrega';
 document.getElementById('addressLabel').firstChild.textContent=delivery?'Endereço para entrega':'Endereço / observação';
 document.getElementById('address').placeholder=delivery?'Rua, número, bairro e complemento':'Opcional';
});
document.getElementById('orderForm').addEventListener('submit',e=>{
 e.preventDefault();
 if(!cart.length){alert('Adicione pelo menos um item ao pedido.');return;}
 const name=document.getElementById('name').value.trim();
 const type=document.getElementById('type').value;
 const address=document.getElementById('address').value.trim();
 const payment=document.getElementById('payment').value;
 const notes=document.getElementById('notes').value.trim();
 if(type==='Entrega'&&!address){alert('Informe o endereço para entrega.');document.getElementById('address').focus();return;}
 const total=cart.reduce((s,x)=>s+x.price,0);
 const lines=['*NOVO PEDIDO — KARMEL BURGER*','',`*Cliente:* ${name}`,`*Tipo:* ${type}`,'','*ITENS DO PEDIDO:*'];
 cart.forEach((x,i)=>lines.push(`${i+1}. ${x.name} — ${money(x.price)}`));
 lines.push('',`*TOTAL: ${money(total)}*`,`*Pagamento:* ${payment}`);
 if(address)lines.push(`*Endereço:* ${address}`);
 if(notes)lines.push(`*Observações:* ${notes}`);
 const url=`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
 window.open(url,'_blank');
});
render();
