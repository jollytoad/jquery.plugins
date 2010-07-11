module("inorder");

function compareWeight(a,b) {
	return parseInt(a.getAttribute('data-weight'),10) - parseInt(b.getAttribute('data-weight'),10);
}

function assertWeightAt(items, index, weight) {
	equal( items[index].getAttribute('data-weight'), weight );
}

function assertWeightAndTextAt(items, index, weight, text) {
	equal( items[index].getAttribute('data-weight'), weight );
	equal( items.eq(index).text(), text );
}


test("insertInto sanity check", 2, function() {
	ok( $, "Check jQuery exists" );
	ok( $.fn.insertInto, "Check jQuery.fn.insertInto exists" );
});

test("insertInto returns item", 1, function() {
	var result = $('<li data-weight="50">Fifty</li>').insertInto('#inorder-return', compareWeight);
	ok( result.is('li[data-weight=50]:contains(Fifty)') );
});

test("insertInto empty", 2, function() {
	$('<li data-weight="50">Fifty</li>').insertInto('#inorder-empty', compareWeight);	
	var items = $('#inorder-empty > li');
	equal( items.length, 1 );
	assertWeightAt(items, 0, 50);
});

test("insertInto inbetween", 5, function() {
	$('<li data-weight="25">Twenty-five</li>').insertInto('#inorder-inbetween', compareWeight);	
	var items = $('#inorder-inbetween > li');
	equal( items.length, 4 );
	assertWeightAt(items, 0, 10);
	assertWeightAt(items, 1, 20);
	assertWeightAt(items, 2, 25);
	assertWeightAt(items, 3, 30);
});

test("insertInto first", 3, function() {
	$('<li data-weight="5">Five</li>').insertInto('#inorder-first', compareWeight);	
	var items = $('#inorder-first > li');
	equal( items.length, 2 );
	assertWeightAt(items, 0, 5);
	assertWeightAt(items, 1, 10);
});

test("insertInto last", 3, function() {
	$('<li data-weight="60">Sixty</li>').insertInto('#inorder-last', compareWeight);	
	var items = $('#inorder-last > li');
	equal( items.length, 2 );
	assertWeightAt(items, 0, 10);
	assertWeightAt(items, 1, 60);
});

test("insertInto duplicate", 9, function() {
	$('<li data-weight="20">Z</li>').insertInto('#inorder-duplicate', compareWeight);	
	var items = $('#inorder-duplicate > li');
	equal( items.length, 4 );
	assertWeightAndTextAt(items, 0, 10, "A");
	assertWeightAndTextAt(items, 1, 20, "B");
	assertWeightAndTextAt(items, 2, 20, "Z");
	assertWeightAndTextAt(items, 3, 30, "C");
});

