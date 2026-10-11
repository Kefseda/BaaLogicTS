//selectedNode

//пока не ясно что с этим делать
////реализовать стратегию?

export default class ConnectionManager{

    //только один экземпляр может существовать
    constructor(bus){

        

        //this.bus = bus;
        //this.selectedNode = null;

        return this;
    }

    /*
    //выбор узла
    selectNode(node){
        if(this.selectedNode == node) return;

        if(this.selectedNode == null){
            this.selectedNode = node;
        }
        else{

        }
    }

    //снятие выбранного узла
    unselectCurrentNode(){
        this.selectedNode = null;
    }
    */

    //соединение узлов (проводком)
    connectNodes(node1, node2){
        
    }

    //рассоединение узлов (перерезаем провод)
    unconnectNodes(node1, node2){

    }
}