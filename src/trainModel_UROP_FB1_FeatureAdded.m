
%   This is UROP Machine_Learning Model
%   "Stress Predictor"
%   This Model has 4 input sources, 1 output result (range from 1 to 5)
%

%   load the data
load('FeatureResult_FB1.txt');
X = FeatureResult_FB1(:, [1:8]);
y = FeatureResult_FB1(:, 9);

%   parse the data into 3 (Train, Cross_Validation, Test)

%   Just for Test
X_train = X;
y_train = y;

%   FeatureScaling
mu = mean(X_train);
sigma = std(X_train);
X_train = (X_train - mu) ./ sigma;

%   check FeatureScaled data
X_train

mu = mean(X_cv);
sigma = std(X_cv);
X_cv = (X_cv - mu) ./ sigma;

mu = mean(X_test);
sigma = std(X_test);
X_test = (X_test - mu) ./ sigma;

%   set the input layer, hidden layer, result size
input_layer_size = 8;
hidden_layer_size = 8;
num_labels = 2;  % this is stress range

%   initialize Theta1, Theta2
initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels);

%   Unroll Parameters
initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];

%   Feed Forward
lambda = 1;
J = nnCostFunction(initial_nn_params, input_layer_size, hidden_layer_size, num_labels, X_train, y_train, lambda);

%   Training Neural Networks
%   Using Train Data
options = optimset('MaxIter', 50);
costFunction = @(p)nnCostFunction(p, input_layer_size, hidden_layer_size, num_labels, X_train, y_train, lambda);
[nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

%   Reshape Data
Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), hidden_layer_size, (input_layer_size +1 ));
Theta2 = reshape(nn_params((1+(hidden_layer_size * (input_layer_size+1))):end), num_labels, (hidden_layer_size+1));

%   Prediction

pred = predict(Theta1, Theta2, X_train);

%   Prediction Accuracy
mean(double(pred==y_train)) * 100


% =========================================================================
