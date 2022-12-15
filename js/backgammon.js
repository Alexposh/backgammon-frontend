console.log("backgammon.js connected");
var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});


function generateLayer() {
    var layer = new Konva.Layer();
    stage.add(layer);

    board_starting_point = {
        x: 200,
        y: 20
    };

    var boardBackground = new Konva.Rect({
        x: board_starting_point.x,
        y: board_starting_point.y,
        width: 1460,
        height: 780,
        fill: "brown",
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.4
    });

    var boardOffSide = new Konva.Rect({
        x: board_starting_point.x + 20,
        y: board_starting_point.y + 20,
        width: 700,
        height: 740,
        fill: "red",
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.2
    });

    var boardHomeSide = new Konva.Rect({
        x: board_starting_point.x + 740,
        y: board_starting_point.y + 20,
        width: 700,
        height: 740,
        fill: "green",
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.2
    });

    var playersHell = new Konva.Rect({
        x: 70,
        y: 40,
        width: 90,
        height: 710,
        fill: "white",
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.2
    });


    var playersHeaven = new Konva.Rect({
        x: 1680,
        y: 40,
        width: 90,
        height: 710,
        fill: "black",
        stroke: 'black',
        strokeWidth: 4,
        opacity: 0.4
    });



    layer.add(boardBackground);
    layer.add(boardOffSide);
    layer.add(boardHomeSide);
    layer.add(playersHell);
    layer.add(playersHeaven);
    return layer;
}

let layer = generateLayer();

class Spot {
    constructor(spotIndex, x, y) {
        this.spotIndex = spotIndex;
        this.x = x;
        this.y = y;
        this.chips = {
            color: null,
            nrOfChips: 0

        };
    }
}
let spotsOnTheBoard = [];
let drawnSpots = [];
let spotIndex = 0;
// let globalPieces = [];




function generateDefaultColorForSpot(spotIndex) {
    return spotIndex % 2 == 0 ? "#00D2FF" : '#eeeee4';
}

function generate_all_spots() {
    start_point_x = board_starting_point.x + 1365;
    start_point_y = board_starting_point.y + 40;


    function createSpot(index, x, y) {
        let newSpot = new Spot(index, x, y);
        return newSpot;
    };



    function drawSpot(index, x, y) {
        let spot = new Konva.Line({
            points: [start_point_x - 45, start_point_y,
            start_point_x + 45, start_point_y,
                start_point_x, start_point_y + 310],
            fill: '#eeeee4',
            stroke: 'black',
            strokeWidth: 5,
            closed: true,
            opacity: 0.4
        });

        if (index >= 12) {
            spot.attrs.points[5] = start_point_y - 310;
        }
        console.log();
        // if(index%2===0){
        //     spot.attrs.fill = "#00D2FF";
        // }         
        spot.attrs.fill = generateDefaultColorForSpot(index);
        return (spot);

    };

    for (i = 0; i <= 23; i++) {
        if (i == 12) {
            start_point_y = board_starting_point.y + 740;
            start_point_x = board_starting_point.x + 95
        }
        let spotAdded = createSpot(i, start_point_x, start_point_y);
        spotsOnTheBoard.push(spotAdded);
        let drawnSingleSpot = drawSpot(i, spotAdded.x, spotAdded.y);
        drawnSpots.push(drawnSingleSpot);
        layer.add(drawnSingleSpot);

        if (i < 12) {
            if (i == 5) {
                start_point_x -= 170;
            } else {
                start_point_x -= 110;
            }
        } else {
            if (i == 17) {
                start_point_x += 170;
            } else {
                start_point_x += 110;
            }
        }

    }
}


// generate_top_spots();
// generate_bottom_spots();

generate_all_spots();

console.log('spots all: ', spotsOnTheBoard);
console.log(drawnSpots);
console.log(layer);

