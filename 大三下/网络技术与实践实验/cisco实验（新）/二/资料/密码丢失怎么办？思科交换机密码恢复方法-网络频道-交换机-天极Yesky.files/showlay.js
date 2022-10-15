function showlayer(id,index)
{
eval("document.getElementById('clayer"+id+"').className='conpqhbg'");
eval("document.getElementById('clayer"+index+"').className='conpdqbg'");
eval("document.getElementById('clay"+id+"').style.display='none'");
eval("document.getElementById('clay"+index+"').style.display='block'");
}

function showlayer2(id,index,other)
{
eval("document.getElementById('clayer3_"+id+"').className='conphdqbg'");
eval("document.getElementById('clayer3_"+index+"').className='conphycbg'");
eval("document.getElementById('clayer3_"+other+"').className='conphycbg'");
eval("document.getElementById('clay3_"+id+"').style.display='block'");
eval("document.getElementById('clay3_"+index+"').style.display='none'");
eval("document.getElementById('clay3_"+other+"').style.display='none'");
}

function qlsh(id)
{
eval("document.getElementById('qldqmenu"+id+"').className='qb'");
eval("document.getElementById('qldq"+id+"').style.visibility='visible'");
}
function qlhs(id)
{
eval("document.getElementById('qldqmenu"+id+"').className='qa'");
eval("document.getElementById('qldq"+id+"').style.visibility='hidden'");
}