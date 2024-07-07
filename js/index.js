// =================X====================X===============
// Tic tac toe


let chance = 0;
let row=[];
let col=[];
let dig;
let rev_diag;
let winner="";
let total_box=prompt("Eneter no of box for game");
if(total_box == ""){
    total_box=4;
}
let n=total_box*total_box;
let box_size=85/total_box;
document.querySelector(".game").style.gap=`${box_size*0.1}vmin`;
for(let i=0;i<n;i++){
    new_element=document.createElement("button");
    new_element.setAttribute("class", "box");
    
    new_element.style.height=`${box_size*0.88}vmin`;
    new_element.style.width=`${box_size*0.88}vmin`;
    new_element.style.fontSize=`${box_size*0.75}vmin`;
    new_element.style.borderRadius=`${box_size*0.01}vmin`;
    document.querySelector(".game").append(new_element);
}


function declare_winer(player){
    if(player==1){
        winner="Player 1";
    }
    else if (player==-1){
        winner="Player 2";
    }
    else{
        winner="Draw! No one";
    }
    document.querySelector("h2").style.visibility="visible";
    document.querySelector("h2").innerText=winner+" is Winner!";
}

function row_count(i,j,player){
    let count=0;
    for(let k=i;k>=0;k--){
        if(row[k][j]==player){
            count++;
        }
        else{
            break;
        }
    }
    for(let k=i+1;k<n;k++){
        if(row[k][j]==player){
            count++;
        }
        else{
            break;
        }
    }
    return count;
}

function col_count(i,j,player){
    let count=0;
    for(let k=j;k>=0;k--){
        if(row[i][k]==player){
            count++;
        }
        else{
            break;
        }
    }
    for(let k=j+1;k<n;k++){
        if(row[i][k]==player){
            count++;
        }
        else{
            break;
        }
    }
    return count;
}

function dig_count(i,j,player){
    let count=0;
    for(let k=i, p=j;k>=0 && p>=0;k--, p--){
        if(row[k][p]==player){
            count++;
        }
        else{
            break;
        }
    }
    for(let k=i+1, p=j+1;k<n && p<n;k++, p++){
        if(row[k][p]==player){
            count++;
        }
        else{
            break;
        }
    }
    return count;
}

function rev_dig_count(i,j,player){
    let count=0;
    for(let k=i, p=j;k>=0 && p<n;k--, p++){
        if(row[k][p]==player){
            count++;
        }
        else{
            break;
        }
    }
    for(let k=i+1, p=j-1;k<n && p>=0;k++, p--){
        if(row[k][p]==player){
            count++;
        }
        else{
            break;
        }
    }
    return count;
}

function check_winner_for_more(player,ind, point){
    let i=Math.floor(ind/n);
    let j=ind%n;
    row[i][j]=player;
    if( row_count(i,j,player)>=point || col_count(i,j,player)>=point || dig_count(i,j,player)>=point || rev_dig_count(i,j,player)>=point){
        declare_winer(player);
    }

}

function check_winner_for_3(player,ind){
    let i=Math.floor(ind/n);
    let j=ind%n;
    row[i]+=player;
    col[j]+=player;
    if(i==j){
        dig+=player;
    }
    if(i==n-j-1){
        rev_diag+=player;
    }
    if(Math.abs(row[i])==n || Math.abs(col[j])==n || Math.abs(dig)==n || Math.abs(rev_diag)==n){
        declare_winer(player);
    }
    else if(chance==(n*n)-1){
        declare_winer(0);
    }
}

function check_winner(player,ind){
    if(n<4){
        check_winner_for_3(player,ind);
    }
    else{
        check_winner_for_more(player,ind,4);
    }
}

boxes=document.querySelectorAll(".box");
n= boxes.length;
n=Math.sqrt(n);
function initialization(){
    for (box of boxes){
        box.innerText="";
    }
    chance=0;
    winner="";
    row=[];
    if(n<4){
        dig=0;
        rev_diag=0;
        col=[];
        for(let i=0;i<n;i++){
            row.push(0);
            col.push(0);
        }
    }
    else{
        for(let i=0;i<n;i++){
            row[i]=[];
            for(let j=0;j<n;j++){
                row[i][j]=0;
            }
        }
    }
    document.querySelector("h2").style.visibility="hidden";
}
for(let i=0;i<n*n;i++){
    boxes[i].addEventListener("click",()=>{
        if(winner === ""){
            if(boxes[i].innerText==""){
                if( chance%2 ==0){
                    boxes[i].innerText="X";
                    check_winner(1,i);
                }
                else{
                    boxes[i].innerText="O";
                    check_winner(-1,i);
                }
                chance++;
            }
        }
    });
};
reset=document.querySelector("#reset");
reset.addEventListener("click",initialization);

help=document.querySelector("#rule");
help.addEventListener("click",()=>{
    if(n<4){
    alert(`Need to make 3 Xs or Os in any column, row, or diagonal like
        X O O 
        X X O
        O X X`);
    }
    else{    
        alert(`Need to make 4 Xs or Os in any column, row, or diagonal like
        X O X O O
        O X X O O
        O X X O X
        X O O X X
        X X O X O`);
    }
});
initialization();