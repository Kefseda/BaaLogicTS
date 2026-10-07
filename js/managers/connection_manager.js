
//selectedNode

export default class ConnectionManager{

    //только один экземпляр может существовать
    constructor(bus){
        if(ConnectionManager.instance){
            return ConnectionManager.instance;
        }
        
        this.bus = bus;
        this.selectedNode = null;
        ConnectionManager.instance = this;

        return this;
    }

    selectNode(node){
        if(this.selectedNode == node) return;

        if(this.selectedNode == null){
            this.selectedNode = node;
        }
        else{

        }
    }

    unselectCurrentNode(){
        this.selectedNode = null;
    }

    connectNodes(){

    }

    unconnectNodes(){

    }
}