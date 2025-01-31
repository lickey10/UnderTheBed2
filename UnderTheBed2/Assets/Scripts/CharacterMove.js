
function FixedUpdate () {
	MoveHero();
	JumpHero();
}

function PlayAnimation(AnimName : String) {
	if (!GetComponent.<Animation>().IsPlaying(AnimName))
	GetComponent.<Animation>().CrossFadeQueued(AnimName, 0.3, QueueMode.PlayNow);
}

function CheckForIdle() {
	if (GetComponent.<Animation>().IsPlaying("Walk")) PlayAnimation("Idle");
	if (!GetComponent.<Animation>().isPlaying) GetComponent.<Animation>().Play("Idle");
}

function MoveHero() {
	if (Mathf.Abs(Input.GetAxis("Horizontal")) > 0.2) {
		if (Input.GetAxis("Horizontal") > 0.02) transform.eulerAngles.y = -90;
		else if (Input.GetAxis("Horizontal") < -0.02) transform.eulerAngles.y = 90;
		transform.Translate(Vector3.forward * Mathf.Abs(Input.GetAxis("Horizontal")) * Time.deltaTime * 3.5);
		if (!GetComponent.<Animation>().IsPlaying("Jump")) PlayAnimation("Walk");
	}
	else CheckForIdle();
}

private var nextJump : float;

function JumpHero () {
	if (Input.GetButton("Jump") && nextJump < Time.time) {
		GetComponent.<Rigidbody>().AddForce(Vector3.up * 25000);
		PlayAnimation("Jump");
		nextJump = Time.time + 1;
		yield WaitForSeconds(0.7); PlayAnimation("Idle");
	}
}

function OnCollisionEnter(collision : Collision) {
	for ( var contact : ContactPoint in collision.contacts ) {
		if (contact.otherCollider.name == "GameFinish")
		Application.LoadLevel("gameFinish");
	}
}