from random import randint
log =True

def randomQuicksort(input_data):
	__rQuicksort(input_data, 0, len(input_data)-1)
	return input_data
	
def __rQuicksort(input_data, low, high):
	if low<high:
		pivot_idx = __rPartition(input_data, low, high)
		if(log):
			print("Partitioning  = ",input_data[low:pivot_idx+1:],input_data[pivot_idx+1:high+1:])
		__rQuicksort(input_data, low, pivot_idx)
		__rQuicksort(input_data, pivot_idx+1, high)

def __rPartition(input_data, low, high):
	random = randint(low,high)
	if(log):
		print('Swapping = ', input_data[low], "&" ,input_data[random], "from",input_data[low:high+1:])
	input_data[random], input_data[low] = input_data[low], input_data[random]
	if(log):
		print('After Swapping = ', input_data[low:high+1:])

	return __partition(input_data, low,high)
		
def __partition(input_data, low, high):
		pivot = input_data[low]
		i = low

		for j in range(low+1, high+1):
			if input_data[j] < pivot:
				i+=1
				input_data[i], input_data[j] = input_data[j], input_data[i]

		input_data[low], input_data[i] = input_data[i], input_data[low]
		return i

# <---------------------------- EXECUTION CODE ----------------------------->
# User Inputs
# input_array = [int(x) for x in input('Please Enter Your Data = ').split()]
	
# Randomised Inputs
nElements = int(input('Enter No. of Elements = '))
input_array = [randint(1,1000) for x in range(nElements)]

print('Input Array = \n', input_array)
print('\nSorted Array = \n',randomQuicksort(input_array))
