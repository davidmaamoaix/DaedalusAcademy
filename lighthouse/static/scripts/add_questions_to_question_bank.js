(function($) {
	const choice_mc_question = `
	<div class="add-qs-choose-mc">
		<p>New Multiple Choice Question (WIP)</p>
	</div>
	`;

	const choice_text_question = `
	<div class="add-qs-choose-text">
		<p>New Text Question</p>
	</div>
	`;

	const new_answer = `
	<div class="add-qs-ms-answer-space">
		<label class="add-qs-ms-answer-label">&nbsp</label>
		<textarea type="text" id="ms-2" name="q-2" class="add-qs-ms-answer-input" placeholder="Enter Answer Here (Latex Support)"></textarea>
		<p>Anwer preview with latex conversion</p>
		<p class="add-qs-latex-conversion" id="add-qs-latex-conversion-q-2"></p>
	</div>
	`;

	const new_credit = `
	<div class="add-qs-ms-credit-space">
		<label for="q-1-sub-1-cred-1" class="add-qs-ms-credit-label">&nbsp</label>
		<textarea type="text" id="ms-2-credit" name="q-2" class="add-qs-ms-credit-input" placeholder="M1"></textarea>
		<div class="add-qs-ms-delete-credit"><p>Delete Mark</p></div>
	</div>
	`;

	const question_id_selector = `
	<div class="add-qs-question-id-select">
		<span>Season</span>
		<select id="season">
			<option selected="selected">m</option>
			<option>s</option>
			<option>w</option>
		</select>
		<span>Year</span>
		<input type="text" name="year" id="year" style="width: 25px;" maxlength="4" placeholder="19"></input>
		<span>Subject</span>
		<select id="subject">
			<option selected="selected">AddMath</option>
			<option>Physics</option>
		</select>
		<span>Paper</span>
		<input type="text" name="paper" id="paper" style="width: 10px;" maxlength="1" placeholder="1"></input>
		<span>Question</span>
		<input type="text" name="question" id="question" style="width: 15px;" maxlength="2" placeholder="2"></input>
		<span>Sub-Question</span>
		<input type="text" name="sub-question" id="sub-question" style="width: 10px;" maxlength="1" placeholder="0"></input>
		<span>Max Mark</span>
		<input type="text" name="max-mark" id="max-mark" style="width: 15px;" maxlength="2" placeholder="3"></input>
		<span>Chapter</span>
		<input type="text" name="chapter" id="chapter" style="width: 25px;" maxlength="3" placeholder="10"></input>
		<span>Sub Chapter</span>
		<input type="text" name="subChap" id="subChap" style="width: 25px;" maxlength="3" placeholder="E"></input>
		<span>Easy/Difficult</span>
		<select id="easydiff">
			<option selected="selected">E</option>
			<option>D</option>
		</select>
	</div>
	`;

	const new_sub_question = `
	<div class="add-qs-sub-question-space">
		<div class="add-qs-topbar">
			<img class="add-qs-trash" src="/static/images/icons/times-solid.svg"></img>
			<img src="/static/images/icons/chevron-down-solid.svg" class="add-qs-expand" style="float:right"></img>
			<input class="add-qs-question-id-input" placeholder="Type question id or select =>" style="float:right"></input>
		</div>
		<label for="q-3-sub-1" class="add-qs-question-label">Sub-Question</label>
		<textarea type="text" id="q-3-sub-1" name="q-3" class="add-qs-question-input" placeholder="Enter Question Here (Latex Support)"></textarea>
		<p>Question preview with latex conversion</p>
		<p class="add-qs-latex-conversion" id="add-qs-latex-conversion-q-3-sub-1"></p>
	</div>`;

	const submit_button = `
	<button class="add-qs-submit-button" id="submit-button">Submit</button>
	`;

	var qid = 1;
	var submit_added = false;
	var image_array = [];

	function return_question_block(qid){
		return `
		<div class="add-qs-question-block add-qs-hover" id="question-${qid}">
			<p>+</p>
		</div>
				`;
	}

	function return_new_text_question(qid){
		return `
		<div class="add-qs-question-space add-qs-hover">
			<div class="add-qs-topbar">
				<img src="/static/images/icons/chevron-down-solid.svg" class="add-qs-expand" style="float:right"></img>
				<input class="add-qs-question-id-input" placeholder="Type question id or select =>" style="float:right"></input>
				<img class="add-qs-trash" src="/static/images/icons/times-solid.svg" style="float:left"></img>
			</div>
			<label for="q-${qid}" class="add-qs-question-label">Question</label>
			<textarea type="text" id="q-${qid}" name="q-${qid}" class="add-qs-question-input" placeholder="Enter Question Here (Latex Support)"></textarea>
			<p>Question preview with latex conversion</p>
			<p class="add-qs-latex-conversion" id="add-qs-latex-conversion-q-${qid}"></p>
			<div class="add-qs-add-sub-q">
				<p>+ Add sub-question</p>
			</div>
			<div class="add-qs-ms-boundary"></div>
			<div class="add-qs-ms-title">
				<p>Mark Scheme</p>
			</div>
			<div class="add-qs-ms-answer-block">
				<div class="add-qs-ms-answer-space">
					<div class="add-qs-topbar">
					</div>
					<label for="q-${qid}-ans-1" class="add-qs-ms-answer-label">Answer</label>
					<textarea type="text" id="q-${qid}-ans-1" name="q-${qid}-ans-1" class="add-qs-ms-answer-input" placeholder="Enter Answer Here (Latex Support)"></textarea>
					<p>Anwer preview with latex conversion</p>
					<p class="add-qs-latex-conversion"></p>
				</div>
			</div>
			<div class="add-qs-ms-credit-block">
				<div class="add-qs-ms-credit-space">
					<div class="add-qs-topbar">
				</div>
					<label for="q-${qid}-cred-1" class="add-qs-ms-credit-label">Marks</label>
					<textarea type="text" id="q-${qid}-cred-1" name="q-${qid}-cred-1" class="add-qs-ms-credit-input" placeholder="M1"></textarea>
					<div class="add-qs-ms-add-credit"><p>Add Marks</p></div>
				</div>
			</div>
		</div>
				`
	}

	function return_sub_question_ms_space(qid,sub_qid){
		return `
		<div class="add-qs-ms-sub-question-space">
			<div class="add-qs-ms-answer-block">
				<div class="add-qs-ms-answer-space">
					<label for="q-${qid}-sub-${sub_qid}-ans-1" class="add-qs-ms-answer-label">Sub-Question Answer</label>
					<textarea type="text" id="q-${qid}-sub-${sub_qid}-ans-1" name="q-${qid}-sub-${sub_qid}-ans-1" class="add-qs-ms-answer-input" placeholder="Enter Answer Here (Latex Support)"></textarea>
					<p>Anwer preview with latex conversion</p>
					<p class="add-qs-latex-conversion" id="add-qs-latex-conversion-q-2"></p>
				</div>
			</div>
			<div class="add-qs-ms-credit-block">
				<div class="add-qs-ms-credit-space">
					<label for="q-${qid}-sub-${sub_qid}-cred-1" class="add-qs-ms-credit-label">Marks</label>
					<textarea type="text" id="q-${qid}-sub-${sub_qid}-cred-1" name="q-${qid}-sub-${sub_qid}-cred-1" class="add-qs-ms-credit-input" placeholder="M1"></textarea>
					<div class="add-qs-ms-add-credit"><p>Add Marks</p></div>
				</div>
			</div>
		</div>
		
		`;
	}

	function nl2br (str, is_xhtml) {
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

	function reassign_subid(question_space){
		var current_qid = question_space.children(".add-qs-question-input").attr('id').slice(2);
		for (var i = 0; i <= question_space.children(".add-qs-sub-question-space").length - 1; i++) {
			var id_target = question_space.children((".add-qs-sub-question-space:eq(" + i +")"));
			var subid = "q-" + current_qid + "-sub-" + (i + 1);
			id_target.children(".add-qs-question-label").attr("for",subid);
			id_target.children(".add-qs-question-input").attr("id",subid).attr("name",subid);
		}
	}

	function bind_latex_conversion(textarea){
		textarea.on("input",function(){
			$(this).parent().children(".add-qs-latex-conversion").last().html(nl2br($(this).val()));
			MathJax.typesetClear();
			MathJax.typeset($(this).parent().find(".add-qs-latex-conversion"));
			$(this).autoheight();
			$(this).css("width","calc(100.3%)");
		});
	}

	// Delete main question or sub question
	function bind_trash(trashicon,sub_question){
		trashicon.on("click",function(){
			if (sub_question) {
				if (confirm("Delete this sub-question?")) {
					var question_space = $(this).parents(".add-qs-question-space");
					var current_subid = $(this).parent().siblings("textarea").attr("id").match(/[0-9]+(?!.*[0-9])/m);
					question_space.children(".add-qs-ms-sub-question-space:eq(" + (current_subid - 1) + ")").remove();
					$(this).parents(".add-qs-sub-question-space").remove();
					reassign_subid(question_space);
					reassign_sub_question_ms_id(question_space);
				}
			}else{
				if (confirm("Delete the whole question? (Including the sub-questions)")) {
					$(this).parents(".add-qs-question-block-confirmed").remove();
					check_and_insert_delete_submit_button();
				}
			}
		});
	}

	function reassign_sub_question_ms_id(parent_of_ms_blocks){
		for (var i = 0; i <= parent_of_ms_blocks.find(".add-qs-ms-sub-question-space").length - 1; i++) {
			var block = parent_of_ms_blocks.find(".add-qs-ms-sub-question-space:eq(" + (i) + ")");
			var answer_block = block.find(".add-qs-ms-answer-block");
			for (var j = 0; j <= answer_block.find(".add-qs-ms-answer-space").length - 1; j++) {
				var space = answer_block.find(".add-qs-ms-answer-space:eq(" + j + ")");
				var new_id = space.find("textarea").attr("id").replace((/(?:sub-)([0-9]+)/), "sub-" + (i + 1));
				space.find("textarea").attr("id",new_id);
			}
		}
	} 

	function bind_expand_and_sync(expand_icon){
		expand_icon.on("click",function(){
			var grandparent = $(this).parent().parent();
			$(this).off("click").parent().after(question_id_selector);
			grandparent.find(".add-qs-question-id-select").children("input").not(":last").each(function(){
				$(this).on("input",function(){
					this.value = this.value.replace(/\D/g,'');
				});
			});
			grandparent.find(".add-qs-question-id-select").children("input").each(function(){
				$(this).on("input",function(){
					sync_question_id(grandparent.find(".add-qs-question-id-input"),$(this).parent());
				});
			});
			grandparent.find(".add-qs-question-id-select").children("select").each(function(){
				$(this).on("change",function(){
					sync_question_id(grandparent.find(".add-qs-question-id-input"),$(this).parent());
				});
			});
			$(this).css("padding","6px 10px 15px 10px").css("background-color","#88bef7");
			$(this).on("click",function(){
				grandparent.find(".add-qs-question-id-select").remove();
				$(this).css("padding","6px 10px 0px 10px").css("background-color","");
				bind_expand_and_sync($(this));
			});
		});
	}

	function sync_question_id(target_output,parent_of_inputs){
		var da_string = "seasonyear-subject-paper-question-sub-question-max-mark-chaptersubChap-easydiff";
		parent_of_inputs.children("input").each(function(){
			da_string = da_string.replace($(this).attr("id"),$(this).val());
		});
		parent_of_inputs.children("select").each(function(){
			da_string = da_string.replace($(this).attr("id"),$(this).children("option:selected").val());
		});
		target_output.val(da_string);
	}

	// Sync answer space height with credit(mark) space height
	function bind_sync_answer_and_mark_div_height(){
		$(".add-qs-ms-answer-input").each(function(){
			var current_answer_space = $(this).parents(".add-qs-ms-answer-space");
			var current_index = $(this).parents(".add-qs-ms-answer-block").find(".add-qs-ms-answer-space").index(current_answer_space);
			var current_credit_space = $(this).parents(".add-qs-ms-answer-block").siblings(".add-qs-ms-credit-block").find(".add-qs-ms-credit-space:eq(" + current_index + ")");
			console.log(current_credit_space);
			current_credit_space.css("height", current_answer_space.css("height"));
		});
		$(".add-qs-ms-answer-input").on("input", function(){
			var current_answer_space = $(this).parents(".add-qs-ms-answer-space");
			var current_index = $(this).parents(".add-qs-ms-answer-block").find(".add-qs-ms-answer-space").index(current_answer_space);
			var current_credit_space = $(this).parents(".add-qs-ms-answer-block").siblings(".add-qs-ms-credit-block").find(".add-qs-ms-credit-space:eq(" + current_index + ")");
			console.log(current_credit_space);
			current_credit_space.css("height", current_answer_space.css("height"));
		});
	
	}

	// Add mark input for sub-question on new sub-question
	function sync_add_sub_question(question_space,current_subid){
		var current_qid_string_length = question_space.children(".add-qs-question-input").attr("id").length;
		var current_qid = question_space.children(".add-qs-question-input").attr("id").slice(current_qid_string_length - 1);
		question_space.append(return_sub_question_ms_space(current_qid,current_subid));
		var added_div = question_space.children(".add-qs-ms-sub-question-space").last();
		bind_add_credit(added_div.find(".add-qs-ms-add-credit"));
		bind_latex_conversion(added_div.find(".add-qs-ms-answer-space").find(".add-qs-ms-answer-input"));
		bind_upload_image(added_div.find(".add-qs-ms-answer-space"));
		bind_sync_answer_and_mark_div_height();
	}

	// event for "add mark button"
	function bind_add_credit(add_mark_button){
		add_mark_button.on("click",function(){
			var great_grandparent = $(this).parent().parent().parent();
			great_grandparent.find(".add-qs-ms-credit-block").first().append(new_credit);
			great_grandparent.find(".add-qs-ms-answer-block").first().append(new_answer);
			var target_answer_block = $(this).parent().parent().parent().children(".add-qs-ms-answer-block").children(".add-qs-ms-answer-space").last();
			var target_credit_block = $(this).parent().parent().find(".add-qs-ms-delete-credit").last().parent();
			bind_upload_image(target_answer_block);
			reassign_credit_id($(this).parent().parent().parent());
			bind_latex_conversion(great_grandparent.find(".add-qs-ms-answer-block").find(".add-qs-ms-answer-input").last());
			$(this).parent().parent().find(".add-qs-ms-delete-credit").last().on("click",function(){
				var great_grandparent = $(this).parent().parent().parent();
				target_answer_block.remove();
				target_credit_block.remove();
				reassign_credit_id(great_grandparent);
			});
			bind_sync_answer_and_mark_div_height();
		});
	}

	function reassign_credit_id(parent_of_blocks){
		for (var i = 0; i <= parent_of_blocks.children(".add-qs-ms-answer-block").children(".add-qs-ms-answer-space").length - 1; i++) {
			var answer_id = parent_of_blocks.children(".add-qs-ms-answer-block").children(".add-qs-ms-answer-space:eq(0)").children(".add-qs-ms-answer-input").attr("id");
			var credit_id = parent_of_blocks.children(".add-qs-ms-credit-block").children(".add-qs-ms-credit-space:eq(0)").children(".add-qs-ms-credit-input").attr("id");
			var da_string =  answer_id.replace(/[0-9]+(?!.*[0-9])/m,(i + 2));
			var db_string =  credit_id.replace(/[0-9]+(?!.*[0-9])/m,(i + 2));
			parent_of_blocks.children(".add-qs-ms-answer-block").children(".add-qs-ms-answer-space:eq(" + (i + 1) +")").children(".add-qs-ms-answer-input").attr("id",da_string);
			parent_of_blocks.children(".add-qs-ms-credit-block").children(".add-qs-ms-credit-space:eq(" + (i + 1) +")").children(".add-qs-ms-credit-input").attr("id",db_string);
		}
	}

	function validate_user_input(){

		var empty_fields = [];
		var id_codes = [];
		var repeated_id_code = [];
		var bad_id_code_regex = [];
		var bad_credit_regex = [];
		

		$(".add-qs-question-input").each(function(){
			if (!$(this).val()) {
				empty_fields.push($(this));
			}
		});
		$(".add-qs-ms-answer-input").each(function(){
			if (!$(this).val()) {
				empty_fields.push($(this));
			}
		});
		$(".add-qs-ms-credit-input").each(function(){
			if (!$(this).val()) {
				empty_fields.push($(this));
			}
			if (!$(this).val().match(CREDIT_REGEX)) {
				bad_credit_regex.push($(this));
			}
		});
		$(".add-qs-question-id-input").each(function(){
			if (!$(this).val()) {
				empty_fields.push($(this));
			}
			//Check if id code input is for sub question and check against corresponding regex
			if ($(this).parent().parent().hasClass("add-qs-sub-question-space")) {
				if (!$(this).val().match(ID_CODE_REGEX_FOR_SUB_QUESTION)) {
					bad_id_code_regex.push($(this));
				}
			}else{
				if (!$(this).val().match(ID_CODE_REGEX_FOR_QUESTION)) {
					bad_id_code_regex.push($(this));
				}
			}
			
			if (id_codes.includes($(this).val())) {
				repeated_id_code.push($(this));
			}
			id_codes.push($(this).val());
		});

		if (empty_fields.length != 0) {
			empty_fields.forEach(function(item){
				item.addClass("add-qs-invalid-input");
			});
			alert("Fields Cannot Be Empty");
			return false;
		}else{
			if (repeated_id_code.length != 0) {
				repeated_id_code.forEach(function(item){
					item.addClass("add-qs-invalid-input");
				});
				alert("Question ID Must Be Unique");
				return false;
			}else{
				if (bad_id_code_regex.length != 0) {
					bad_id_code_regex.forEach(function(item){
						item.addClass("add-qs-invalid-input");
					});
					alert("Invalid Question ID Format");
					return false;
				}else{
					if (bad_credit_regex.length != 0) {
						bad_credit_regex.forEach(function(item){
							item.addClass("add-qs-invalid-input");
						});
						alert("Invalid Marks Format");
						return false;
					}else{
						return true;
					}
				}
			}
		}
	}

	function submit_data_to_server(){

		var params = {
			questions:{
			},
			sub_questions:{
				
			},
			mark:{

			}
		};
		var temp_id_references = []; //id_code, temp_id, order (if is mark)

		var question_count = 0;
		$(".add-qs-question-space").each(function(){
			var text = $(this).children(".add-qs-question-input").val();
			var id_code = $(this).find(".add-qs-question-id-input").val();
			var temp_id = $(this).children(".add-qs-question-input").attr("id");
			var has_image = false;
			var has_subquestion = false;
			if ($.inArray(temp_id, $.map(image_array, function(v) { return v[1]; })) > -1) {
				has_image = true;
				temp_id_references.push({"id_code": id_code, "temp_id": temp_id, "order": "none"});
			}
			if ($(this).children(".add-qs-sub-question-space").length) {
				has_subquestion = true;
			}
			params.questions[question_count] = {
				text: text,
				has_image: has_image,
				has_subquestion: has_subquestion,
				id_code: id_code
			};
			question_count ++;
		});

		var sub_question_count = 0;
		$(".add-qs-sub-question-space").each(function(){
			var text = $(this).children(".add-qs-question-input").val();
			var main_question_id_code = $(this).parent().find(".add-qs-question-id-input").val();
			var id_code = $(this).find(".add-qs-question-id-input").val();
			var temp_id = $(this).children(".add-qs-question-input").attr("id");
			var has_image = false;
			if ($.inArray(temp_id, $.map(image_array, function(v) { return v[1]; })) > -1) {
				has_image = true;
				temp_id_references.push({"id_code": id_code, "temp_id": temp_id, "order": "none"});
			}
			params.sub_questions[sub_question_count] = {
				text: text,
				has_image: has_image,
				id_code: id_code,
				main_question_id_code: main_question_id_code
			};
			sub_question_count ++;
		});

		var mark_count = 0;
		$(".add-qs-ms-answer-space").each(function(){
			var text = $(this).children(".add-qs-ms-answer-input").val();
			var order = $(this).parent().children(".add-qs-ms-answer-space").index($(this));
			var mark = $(this).parent().siblings(".add-qs-ms-credit-block").children(".add-qs-ms-credit-space").eq(order).children(".add-qs-ms-credit-input").val();

			//get id code
			//check if belong to main question
			var id_code;
			if ($(this).parent().parent().hasClass("add-qs-ms-sub-question-space")) {
				var sub_question_number = $(this).parents(".add-qs-question-space").find(".add-qs-ms-sub-question-space").index($(this).parent().parent());
				id_code = $(this).parents(".add-qs-question-space").find(".add-qs-sub-question-space").eq(sub_question_number).find(".add-qs-question-id-input").val();
			}else{
				id_code = $(this).parents(".add-qs-question-space").find(".add-qs-question-id-input").first().val();
			}

			var has_image = false;
			var temp_id = $(this).children(".add-qs-ms-answer-input").attr("id");
			if ($.inArray(temp_id, $.map(image_array, function(v) { return v[1]; })) > -1) {
				has_image = true;
				temp_id_references.push({"id_code": id_code, "temp_id": temp_id, "order": order});
			}

			params.mark[mark_count] = {
				text: text,
				order: order,
				mark :mark,
				id_code: id_code,
				has_image: has_image
			};
			mark_count ++;
		});

		var formdata = new FormData();
		if (image_array.length != 0) {
			$("#submit-button").html("Uploading Image");
			var id_codes = [],
				orders = [];
			image_array.forEach(function(item){
				var current_id_reference = temp_id_references.filter(function(reference){return reference.temp_id == item[1];})[0];
				formdata.append("files", item[0]);
				id_codes.push(current_id_reference.id_code);
				orders.push(current_id_reference.order);
			});
			formdata.append("id_codes", id_codes);
			formdata.append("orders", orders);
		}else{
			formdata.append("has_no_image", true);
		}
		$.ajax({
			type: 'POST',
			url:  '/upload_image',
			data: formdata,
			contentType: false,
			cache: false,
			processData: false,
			success: function(data){
				if (data.code == 1) {
					$.post("/add_qs",params,
					function(data) {
						handle_server_response(data);
						if (data.code == 5) {
							$("#submit-button").html("Upload Success");
						}
					}
				);
				}
			},
			error: function(){
				$("#submit-button").html("Error! Please Contact the Lighthouse Team");
			}
		});
		
	}

	function check_and_insert_delete_submit_button(){
		if ($(".add-qs-question-space").length != 0 && submit_added == false) {
			$(".add-qs-question-block-confirmed").last().parent().append(submit_button);
			$("#submit-button").on("click", function(){
				$("input").removeClass("add-qs-invalid-input");
				$("textarea").removeClass("add-qs-invalid-input"); //remove existing invalid field warnings
				
				if (validate_user_input()) {
					submit_data_to_server();
				}
				
			});
			submit_added = true;
		}
		if ($(".add-qs-question-space").length == 0 && submit_added == true) {
			$(".add-qs-submit-button").remove();
			submit_added = false;
		}
	}

	function bind_upload_image(div){

		div.on("drag dragstart dragend dragover dragenter dragleave drop",function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		.on("dragenter dragover",function(){
			$(this).addClass("add-qs-drag-on");
		})
		.on("dragleave dragend drop",function(){
			$(this).removeClass("add-qs-drag-on");
		})
		.on("drop",function(e){
			var question_id;
			if (div.hasClass("add-qs-ms-answer-space")) {
				question_id = div.find(".add-qs-ms-answer-input").first().attr("id");
			}else{
				question_id = div.find(".add-qs-question-input").first().attr("id");
			}
			var droppedFiles = e.originalEvent.dataTransfer.files;
			var reader = new FileReader();
			if (droppedFiles.length != 1){
				alert("Please upload only one image");
			}else{
				var target_file = droppedFiles[0];
				reader.readAsDataURL(target_file);
				if (target_file.type.indexOf("jpg") == -1 && target_file.type.indexOf("jpeg") == -1 && target_file.type.indexOf("png") == -1) {
					alert("Lighthouse only supports images of format jpg and png");
				}else{
					if ($.inArray(question_id, $.map(image_array, function(v) { return v[1]; })) > -1) {
						alert("Currently, one question should only have one image");
					}else{
						reader.onload = function(){
							var label_name;
							if (div.hasClass("add-qs-ms-answer-space")) {
								label_name = "add-qs-ms-answer-label";
							}else{
								label_name = "add-qs-question-label";
							}
							div.find("." + label_name).first().after($("<img>",{ //Cross Icon
								src:"/static/images/icons/times-solid.svg",
								class:"add-qs-image-icons",
								style:"margin-left:0px"
							}).on("click",function(){
								$(this).siblings(".add-qs-image-icons").remove();
								$(this).remove();
								image_array.splice($.inArray(question_id, $.map(image_array, function(v) { return v[1]; })),1);
							})).after($("<img>",{ //Image icon
								src:"/static/images/icons/file-image-solid.svg",
								class:"add-qs-image-icons",
							}));
							image_array.push([target_file,question_id]);
						};
					}
				}
			}
		});
	}

	function bind_event_on_question(qid){
		$(`#question-${qid}`).on("click",function(e){
			e.stopImmediatePropagation();
			$(this).empty().append(choice_mc_question).append(choice_text_question).fadeTo(0,1).toggleClass("add-qs-hover").off("click");
			$(this).children(".add-qs-choose-mc").on("click",function(){
			});
			$(this).children(".add-qs-choose-text").on("click",function(e){
				e.stopPropagation();
				var parent = $(this).parent();
				parent.empty().attr("style","cursor:auto;").append(return_new_text_question(qid)).removeClass("add-qs-hover add-qs-question-block").addClass("add-qs-question-block-confirmed");
				parent.find(".add-qs-question-id-input").on("input",function(){
				});
				bind_upload_image(parent);
				bind_upload_image(parent.find(".add-qs-ms-answer-space"));
				bind_latex_conversion(parent.find(".add-qs-question-input"));
				bind_latex_conversion(parent.find(".add-qs-ms-answer-space").find(".add-qs-ms-answer-input"));
				bind_trash(parent.find(".add-qs-trash"),false);
				bind_add_credit(parent.find(".add-qs-ms-add-credit"),qid);
				bind_expand_and_sync(parent.find(".add-qs-expand"));
				bind_sync_answer_and_mark_div_height();
				parent.find(".add-qs-add-sub-q").on("click",function(){
					$(this).before(new_sub_question);
					var added_div = $(this).parent().children(".add-qs-sub-question-space").last();
					reassign_subid($(this).parent());
					bind_upload_image(added_div);
					var current_subid = added_div.children(".add-qs-question-input").attr("id").match(/[0-9]+(?!.*[0-9])/m);
					bind_latex_conversion(added_div.children("textarea"));
					sync_add_sub_question($(this).parent(),current_subid);
					bind_trash(added_div.find(".add-qs-trash"),true);
					bind_sync_answer_and_mark_div_height();
				});
				qid++;
				$(".add-qs-question-block-confirmed").last().after(return_question_block(qid));
				bind_event_on_question(qid);
				check_and_insert_delete_submit_button();
			});
		});
	}
	
	bind_event_on_question(qid);




})(jQuery);